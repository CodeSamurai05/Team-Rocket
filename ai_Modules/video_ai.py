# video_ai.py
import os
import uuid
import shutil
import random
import textwrap
import httpx
import tempfile
import asyncio
from PIL import Image, ImageDraw
from gtts import gTTS
from moviepy.editor import ImageClip, concatenate_videoclips, AudioFileClip
import base64
from typing import List, Optional

# Pillow compatibility
if not hasattr(Image, 'ANTIALIAS'):
    Image.ANTIALIAS = Image.LANCZOS

# Helper: placeholder images (keeps simple and deterministic-ish)
def generate_placeholder_images(prompt: str, n_images: int = 4, size=(1024,1024)) -> List[str]:
    out_paths = []
    for i in range(n_images):
        img = Image.new('RGB', size, color=(random.randint(20,60), random.randint(20,60), random.randint(20,60)))
        d = ImageDraw.Draw(img)
        # write prompt snippet
        txt = (prompt[:120] + "...") if len(prompt) > 120 else prompt
        lines = textwrap.wrap(txt, width=30)
        y = 40
        for line in lines:
            d.text((40, y), line, fill=(255,255,255))
            y += 24
        path = os.path.abspath(f"tmp_placeholder_{uuid.uuid4().hex}.png")
        img.save(path)
        out_paths.append(path)
    return out_paths

# OpenAI image generation (compatible shape)
async def generate_images_openai(prompt: str, api_key: str, n_images: int = 4, size: str = "1024x1024") -> List[str]:
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY not set")
    url = "https://api.openai.com/v1/images/generations"
    headers = {"Authorization": f"Bearer {api_key}"}
    payload = {"model":"dall-e-3","prompt":prompt,"size":size,"n":n_images,"response_format":"url"}
    async with httpx.AsyncClient(timeout=120.0) as client:
        resp = await client.post(url, headers=headers, json=payload)
        if resp.status_code != 200:
            raise RuntimeError(f"Image API error {resp.status_code}: {resp.text}")
        data = resp.json()
    out = []
    for item in data.get("data", []):
        if "b64_json" in item:
            img_bytes = base64.b64decode(item["b64_json"])
        elif "url" in item:
            async with httpx.AsyncClient(timeout=60.0) as client:
                r2 = await client.get(item["url"])
                img_bytes = r2.content
        else:
            raise RuntimeError("Unknown image payload")
        path = os.path.abspath(f"tmp_img_{uuid.uuid4().hex}.png")
        with open(path, "wb") as f:
            f.write(img_bytes)
        out.append(path)
    return out

# Stability AI image gen
async def generate_images_stability(prompt: str, api_key: str, n_images: int = 4, width: int = 1024, height: int = 1024) -> List[str]:
    if not api_key:
        raise RuntimeError("STABILITY_API_KEY not set")
    api_url = "https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image"
    headers = {"Authorization": f"Bearer {api_key}", "Accept":"application/json", "Content-Type":"application/json"}
    payload = {"text_prompts":[{"text":prompt}], "cfg_scale":7, "samples":n_images, "width":width, "height":height}
    async with httpx.AsyncClient(timeout=120.0) as client:
        resp = await client.post(api_url, headers=headers, json=payload)
        if resp.status_code != 200:
            raise RuntimeError(f"Stability API error {resp.status_code}: {resp.text}")
        data = resp.json()
    out=[]
    for item in data.get("artifacts", []):
        b64 = item.get("base64")
        if not b64:
            continue
        img_bytes = base64.b64decode(b64)
        path = os.path.abspath(f"tmp_img_{uuid.uuid4().hex}.png")
        with open(path, "wb") as f:
            f.write(img_bytes)
        out.append(path)
    return out

def text_to_speech_gtts(text: str, audio_path: str, lang: str = "en") -> str:
    """Create TTS audio using gTTS."""
    tts = gTTS(text=text, lang=lang)
    tts.save(audio_path)
    return audio_path

def make_slideshow(image_paths: List[str], audio_path: str, out_video_path: str, fps: int = 24) -> str:
    """Create a slideshow video with audio. Raises on failure."""
    audio = AudioFileClip(audio_path)
    total_dur = audio.duration
    n = len(image_paths) or 1
    per_image = max(1.0, total_dur / n)
    clips = []
    # Use first image size as target
    first = Image.open(image_paths[0])
    target_w, target_h = first.size
    first.close()
    for path in image_paths:
        clip = ImageClip(path).set_duration(per_image).resize(width=target_w)
        clips.append(clip)
    video = concatenate_videoclips(clips, method="compose")
    video = video.set_audio(audio)
    video.write_videofile(out_video_path, fps=fps, codec="libx264", audio_codec="aac")
    try:
        video.reader.close()
        if video.audio:
            video.audio.reader.close_proc()
    except Exception:
        pass
    return out_video_path

async def create_video(prompt: str, openrouter_key: Optional[str], openai_key: Optional[str], stability_key: Optional[str], voice_backend: str = "gtts") -> Optional[str]:
    """
    Main entry: generates a short educational video from a prompt.
    Returns path to mp4 (caller responsible to serve and then delete).
    """
    # temp dir ensures cleanup
    with tempfile.TemporaryDirectory(prefix="lunora_video_") as workdir:
        # 1) Script generation (use openrouter if available)
        explanation = prompt
        if openrouter_key:
            try:
                payload = {
                    "model": "openai/gpt-3.5-turbo",
                    "messages": [{"role": "user", "content": f"Write a fun 100-word script for a short educational video about: {prompt}. Start with a hook!"}],
                    "max_tokens": 150
                }
                headers = {"Authorization": f"Bearer {openrouter_key}", "Content-Type": "application/json"}
                async with httpx.AsyncClient(timeout=60.0) as client:
                    r = await client.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=payload)
                if r.status_code == 200:
                    explanation = r.json().get("choices", [{}])[0].get("message", {}).get("content", explanation).strip()
            except Exception:
                pass

        # 2) Images
        images = []
        n_images = 4
        try:
            if openai_key:
                images = await generate_images_openai(prompt, openai_key, n_images=n_images)
            elif stability_key:
                images = await generate_images_stability(prompt, stability_key, n_images=n_images)
            else:
                images = generate_placeholder_images(prompt, n_images=n_images)
        except Exception:
            images = generate_placeholder_images(prompt, n_images=n_images)

        # Move images into workdir
        image_paths = []
        for p in images:
            dest = os.path.join(workdir, os.path.basename(p))
            shutil.move(p, dest)
            image_paths.append(dest)

        # 3) TTS
        audio_path = os.path.join(workdir, f"audio_{uuid.uuid4().hex}.mp3")
        try:
            # detect language naive: if prompt contains devanagari -> hi
            lang = "hi" if any("\u0900" <= ch <= "\u097F" for ch in prompt) else "en"
            text_to_speech_gtts(explanation, audio_path, lang=lang)
        except Exception as e:
            raise RuntimeError(f"TTS failed: {e}")

        # 4) Video assembly
        video_path = os.path.join(workdir, f"video_{uuid.uuid4().hex}.mp4")
        try:
            make_slideshow(image_paths, audio_path, video_path, fps=24)
        except Exception as e:
            raise RuntimeError(f"Video creation failed: {e}")

        # copy out to a permanent file in current dir so caller can access after tempdir closed
        out_final = os.path.abspath(f"generated_video_{uuid.uuid4().hex}.mp4")
        shutil.copy(video_path, out_final)
        return out_final
