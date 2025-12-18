import httpx
import os

# --- WHISPER API CONFIGURATION ---
# Hum OpenAI ka Whisper model use karenge.
# Iske liye 'OPENAI_API_KEY' hona zaruri hai .env file mein.

async def transcribe_audio(file_path: str, api_key: str):
    if not api_key:
        raise ValueError("OPENAI_API_KEY is missing for Whisper.")

    url = "https://api.openai.com/v1/audio/transcriptions"
    headers = {
        "Authorization": f"Bearer {api_key}"
    }
    
    # Whisper ko file aur model name chahiye hota hai
    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            with open(file_path, "rb") as f:
                files = {"file": (os.path.basename(file_path), f, "audio/mpeg")}
                data = {"model": "whisper-1"}
                
                resp = await client.post(url, headers=headers, files=files, data=data)
                
                if resp.status_code != 200:
                    raise Exception(f"Whisper API Error: {resp.text}")
                
                result = resp.json()
                return {"text": result.get("text", "")}
                
    except Exception as e:
        print(f"Audio Transcribe Error: {e}")
        return {"error": str(e)}