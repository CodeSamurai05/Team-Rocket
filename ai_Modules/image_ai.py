# image_ai.py
import httpx
import json
import re
import base64
from typing import Any, Dict
import asyncio

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

async def _post_with_retries(url: str, headers: dict, payload: dict, retries: int = 3, timeout: int = 60):
    for attempt in range(1, retries + 1):
        try:
            async with httpx.AsyncClient(timeout=timeout) as client:
                resp = await client.post(url, headers=headers, json=payload)
                return resp
        except (httpx.RequestError, httpx.ReadTimeout):
            if attempt == retries:
                raise
            await asyncio.sleep(0.5 * (2 ** (attempt - 1)))

def _clean_and_parse_json(response_text: str) -> Any:
    if not isinstance(response_text, str):
        return {"text": str(response_text)}
    response_text = response_text.strip()
    response_text = re.sub(r"^```(?:json)?\s*", "", response_text)
    response_text = re.sub(r"\s*```$", "", response_text)
    try:
        return json.loads(response_text)
    except:
        m = re.search(r"\{[\s\S]*\}", response_text)
        if m:
            try:
                return json.loads(m.group())
            except:
                pass
    return {"text": response_text}

async def analyze_image(prompt: str, file_bytes: bytes, mime_type: str, language: str, api_key: str) -> Dict:
    """
    Analyze an uploaded image together with prompt. Returns JSON-like dict.
    This function simply sends data to the LLM (OpenRouter) for multimodal analysis
    if the model supports it. If not supported, returns a polite error message.
    """
    if not api_key:
        return {"error": "OPENROUTER API key missing"}

    # Basic size/mime guards
    max_size_bytes = 6 * 1024 * 1024  # 6 MB
    if len(file_bytes) > max_size_bytes:
        return {"error": "Image too large (limit 6MB)"}

    b64 = base64.b64encode(file_bytes).decode("utf-8")
    lang_instruction = "Respond in Hindi." if language == "hi" else "Respond in English."

    system_instruction = f"""
You are Lunora. User provided an image and a prompt.
Task: Analyze the image and answer the user's prompt concisely.

Return JSON only:
{{ "text": "analysis here", "recommended_topics": [] }}
{lang_instruction}
"""

    # Compose message - using a structured payload that some router endpoints accept
    messages = [
        {"role": "system", "content": system_instruction},
        {"role": "user", "content": f"Prompt: {prompt}\nData-URL: data:{mime_type};base64,{b64}"}
    ]

    headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
    payload = {"model": "google/gemini-2.0-flash-lite-preview-02-05:free", "messages": messages, "max_tokens": 600, "response_format": {"type": "json_object"}}

    resp = await _post_with_retries(OPENROUTER_URL, headers, payload, retries=3, timeout=120)
    if resp.status_code != 200:
        return {"error": f"Image analysis failed: {resp.status_code}"}
    raw = resp.json().get("choices", [{}])[0].get("message", {}).get("content", "")
    return _clean_and_parse_json(raw)
