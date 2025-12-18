# text_ai.py
import httpx
import json
import re
import asyncio
from typing import Any, Dict


MODEL_DEFAULT = "openai/gpt-4o-mini"
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
        return {"text": str(response_text), "recommended_topics": []}
    response_text = response_text.strip()
    response_text = re.sub(r"^```(?:json)?\s*", "", response_text)
    response_text = re.sub(r"\s*```$", "", response_text)
    try:
        return json.loads(response_text)
    except json.JSONDecodeError:
        m = re.search(r"\{[\s\S]*\}", response_text)
        if m:
            try:
                return json.loads(m.group())
            except json.JSONDecodeError:
                pass
    return {"text": response_text, "recommended_topics": []}

async def call_llm(api_key: str, messages: list, model: str = MODEL_DEFAULT, max_tokens: int = 300, json_mode: bool = False) -> str:
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Lunora Student AI"
    }
    payload = {"model": model, "messages": messages, "max_tokens": max_tokens}
    if json_mode:
        payload["response_format"] = {"type": "json_object"}

    resp = await _post_with_retries(OPENROUTER_URL, headers, payload, retries=3, timeout=60)
    if resp.status_code != 200:
        raise RuntimeError(f"LLM API Error: {resp.status_code}: {resp.text}")
    return resp.json()["choices"][0]["message"]["content"].strip()

# Public functions

async def generate_text_response(prompt: str, type_: str, lang_instruction: str, api_key: str) -> Dict:
    """
    Explain / brief / greeting handler.
    Returns a dict parsed from LLM.
    """
    if not api_key:
        raise RuntimeError("OPENROUTER API key missing")

    # quick greeting detection
    greetings = {"hi","hello","hey","namaste","kya haal hai","hii","sup"}
    if prompt.lower().strip(" .!?") in greetings:
        # Avoid echoing the user's message back. Return a short energetic greeting.
        user_content = f"Reply with a super-energetic, friendly greeting and an emoji. Keep it short. {lang_instruction}"
        raw = await call_llm(api_key, [{"role":"user","content":user_content}], model="openai/gpt-3.5-turbo", max_tokens=60)
        return {"text": raw, "recommended_topics": []}

    system_instruction = f"""
You are Lunora, a super cool and friendly AI teacher.
Analyze the user's prompt: '{prompt}'.

Return strict JSON only:
{{ "text": "...", "recommended_topics": ["..."] }}
{lang_instruction}
"""
    if type_ == "brief":
        system_instruction += "\nKeep the 'text' short and punchy."

    raw = await call_llm(api_key, [{"role":"system","content":system_instruction}], model=MODEL_DEFAULT, max_tokens=1000, json_mode=True)
    return _clean_and_parse_json(raw)

async def generate_quiz(prompt: str, lang_instruction: str, api_key: str, difficulty: str = "easy") -> Dict:
    """
    Generate quiz questions with difficulty levels (FAST MODE)
    difficulty: "easy" (10 questions) or "hard" (25 questions)
    """
    if not api_key:
        raise RuntimeError("OPENROUTER API key missing")
    
    # Set number of questions based on difficulty
    num_questions = 25 if difficulty == "hard" else 10
    
    # OPTIMIZED PROMPT - Minimal and fast
    quiz_prompt = f"""Generate {num_questions} MCQs for: {prompt}
Format: {{"questions": [{{"question":"Q1","options":["A","B","C","D"],"answer":"A"}}]}}
Be brief. {lang_instruction}"""
    
    # Reduced max_tokens for faster response
    max_tokens = 1200 if difficulty == "hard" else 800
    
    raw = await call_llm(api_key, [{"role":"user","content":quiz_prompt}], model=MODEL_DEFAULT, max_tokens=max_tokens, json_mode=True)
    return _clean_and_parse_json(raw)

async def search_videos(prompt: str, lang_instruction: str, api_key: str) -> Dict:
    if not api_key:
        raise RuntimeError("OPENROUTER API key missing")
    video_prompt = f"Find 3-5 videos for '{prompt}'. JSON: {{'videos':[{{'title':'','source':'','url':''}}]}} {lang_instruction}"
    raw = await call_llm(api_key, [{"role":"user","content":video_prompt}], model=MODEL_DEFAULT, max_tokens=400, json_mode=True)
    return _clean_and_parse_json(raw)

async def generate_flashcards(prompt: str, lang_instruction: str, api_key: str) -> Dict:
    if not api_key:
        raise RuntimeError("OPENROUTER API key missing")
    flashcard_prompt = f"Create 5 flashcards for '{prompt}'. JSON: {{'cards':[{{'front':'','back':''}}]}} {lang_instruction}"
    raw = await call_llm(api_key, [{"role":"user","content":flashcard_prompt}], model=MODEL_DEFAULT, max_tokens=600, json_mode=True)
    return _clean_and_parse_json(raw)

async def generate_roadmap(prompt: str, lang_instruction: str, api_key: str) -> Dict:
    if not api_key:
        raise RuntimeError("OPENROUTER API key missing")
    roadmap_prompt = f"Create learning roadmap for '{prompt}' (Beginner->Advanced). JSON: {{'steps':[{{'step':'','details':''}}]}} {lang_instruction}"
    raw = await call_llm(api_key, [{"role":"user","content":roadmap_prompt}], model=MODEL_DEFAULT, max_tokens=700, json_mode=True)
    return _clean_and_parse_json(raw)
