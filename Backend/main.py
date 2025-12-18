import os
import sys
import shutil
import httpx
import uuid
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from dotenv import load_dotenv

# ==========================================
# 1. PATH SETUP & DEBUGGING (SMART FIX)
# ==========================================
current_dir = os.path.dirname(os.path.abspath(__file__)) # Jahan ye main.py hai
parent_dir = os.path.abspath(os.path.join(current_dir, '..')) # Uske upar wala folder

# Paths add karein
if current_dir not in sys.path: sys.path.append(current_dir)
if parent_dir not in sys.path: sys.path.append(parent_dir)

# --- CRITICAL FIX: Add 'backend' to path if 'ai' is inside it ---
backend_path = os.path.join(current_dir, 'backend')
if os.path.exists(backend_path) and os.path.isdir(backend_path):
    sys.path.append(backend_path)
    print(f"📂 Added 'backend' folder to Path: {backend_path}")

# ==========================================
# 2. IMPORTS
# ==========================================
# --- Root Modules (ai_Modules) ---
try:
    from ai_Modules import text_ai, video_ai, image_ai, smart_ai, audio_ai
    print("✅ Core AI Modules Imported!")
except ImportError:
    try:
        from ai_Modules import text_ai, video_ai, image_ai, smart_ai, audio_ai
        print("✅ Core AI Modules Imported (Uppercase)!")
    except ImportError as e:
        print(f"❌ Error importing ai_Modules: {e}")

# --- Internal Tools (ai/rag, ai/tools) ---
NCERTKnowledgeBase = None
WebSearcher = None

try:
    # Option 1: Agar 'ai' folder bahar hai
    from ai.rag.ncert_loader import NCERTKnowledgeBase
    from ai.tools.web_search import WebSearcher
    print("✅ RAG & Web Search Tools Imported (Direct)!")
except ImportError:
    try:
        # Option 2: Agar 'ai' folder 'backend' ke andar hai
        from backend.ai.rag.ncert_loader import NCERTKnowledgeBase
        from backend.ai.tools.web_search import WebSearcher
        print("✅ RAG & Web Search Tools Imported (from backend.ai)!")
    except ImportError as e:
        print(f"❌ RAG Import Error: {e}")
        print("   (System could not find 'ai' folder in root or inside backend)")

# ==========================================
# 3. APP SETUP
# ==========================================
load_dotenv()
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
STABILITY_API_KEY = os.getenv("STABILITY_API_KEY")
VOICE_BACKEND = os.getenv("VOICE", "gtts")

app = FastAPI()

# Serve generated videos from a public folder
GEN_VIDEOS_DIR = os.path.join(current_dir, 'generated_videos')
os.makedirs(GEN_VIDEOS_DIR, exist_ok=True)
app.mount('/generated_videos', StaticFiles(directory=GEN_VIDEOS_DIR), name='generated_videos')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Initialize RAG Knowledge Base ---
knowledge_base = None
if NCERTKnowledgeBase:
    try:
        knowledge_base = NCERTKnowledgeBase()
        print("📚 RAG Knowledge Base Initialized")
    except Exception as e:
        print(f"⚠️ RAG Init Failed: {e}")

# --- Models ---
class ChatRequest(BaseModel):
    prompt: str
    type: str  
    language: str = "en"
    difficulty: str = "easy"  # For quiz: "easy" (10 q) or "hard" (25 q)

class VideoRequest(BaseModel):
    prompt: str

@app.get("/")
def health():
    return {"status": "Lunora Backend is Active 🟢"}

# ==========================================
# 4. MAIN CHAT ROUTE
# ==========================================
@app.post("/chat")
async def handle_chat(body: ChatRequest):
    if not OPENROUTER_API_KEY:
        return JSONResponse(content={"error": "API Key Missing"}, status_code=500)

    lang_instruction = "Respond in Hindi." if body.language == "hi" else "Respond in English."
    
    # --- A. CONTEXT GATHERING ---
    context_data = ""
    source_info = ""

    # 1. Web Search
    if WebSearcher and ("internet" in body.prompt.lower() or "search" in body.prompt.lower()):
        try:
            print("🌍 Searching Internet...")
            searcher = WebSearcher()
            search_result = searcher.search(body.prompt)
            context_data += f"\n[Internet Info]: {search_result}\n"
            source_info = "(Source: Internet)"
        except Exception as e:
            print(f"Search Error: {e}")

    # 2. RAG / PDF Search
    if knowledge_base and ("book" in body.prompt.lower() or "chapter" in body.prompt.lower() or "syllabus" in body.prompt.lower() or "notes" in body.prompt.lower()):
        try:
            print("📚 Searching Knowledge Base...")
            pdf_result = knowledge_base.get_relevant_content(body.prompt)
            if pdf_result:
                context_data += f"\n[Book/Notes Context]: {pdf_result}\n"
                source_info += " (Source: PDF Notes)"
        except Exception as e:
            print(f"RAG Error: {e}")

    # --- B. PROMPT CONSTRUCTION ---
    final_prompt = body.prompt
    if context_data:
        final_prompt = f"""
        Use the following CONTEXT to answer the user's question accurately.
        
        CONTEXT:
        {context_data}
        
        USER QUESTION: {body.prompt}
        
        INSTRUCTION: Answer naturally. If the answer is in the context, use it. If not, use your own knowledge.
        Add this source note at the very end: {source_info}
        """

    # --- C. RESPONSE GENERATION ---
    try:
        # Specific Tools
        if body.type == "quiz":
            return await text_ai.generate_quiz(body.prompt, lang_instruction, OPENROUTER_API_KEY, body.difficulty)
        elif body.type == "videos":
            return await text_ai.search_videos(body.prompt, lang_instruction, OPENROUTER_API_KEY)
        elif body.type == "flashcards":
            return await text_ai.generate_flashcards(body.prompt, lang_instruction, OPENROUTER_API_KEY)
        elif body.type == "roadmap":
            return await text_ai.generate_roadmap(body.prompt, lang_instruction, OPENROUTER_API_KEY)
        
        # Default: Smart AI
        else:
            return await smart_ai.smart_chat(final_prompt, lang_instruction, OPENROUTER_API_KEY)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


# ==========================================
# 5. MULTIMEDIA ROUTES
# ==========================================

@app.post("/generate-video")
async def generate_video(body: VideoRequest):
    try:
        # 1) Quick check: are there existing videos online for this topic?
        try:
            search_res = await text_ai.search_videos(body.prompt, "", OPENROUTER_API_KEY)
            videos = []
            if isinstance(search_res, dict):
                videos = search_res.get('videos') or search_res.get('value') or []

            # Validate returned video URLs to avoid hallucinated/fake links
            valid_videos = []
            if videos:
                async with httpx.AsyncClient(timeout=5.0) as client:
                    for v in videos:
                        try:
                            if not isinstance(v, dict):
                                continue
                            url = v.get('url') or v.get('link') or v.get('video_url')
                            title = v.get('title') or v.get('name') or ''
                            source = v.get('source') or ''
                            if not url or not (str(url).startswith('http://') or str(url).startswith('https://')):
                                continue
                            # Quick HEAD to ensure resource exists (follow redirects)
                            resp = await client.head(url, follow_redirects=True)
                            if resp.status_code < 400:
                                valid_videos.append({'title': title, 'source': source, 'url': url})
                        except Exception:
                            # skip invalid/timeout URL
                            continue

            if valid_videos:
                # Return only validated links
                return JSONResponse(content={"found": True, "videos": valid_videos})
        except Exception:
            # If search or validation fails, fall through to generation
            videos = []

        # 2) No suitable online video found — generate one
        video_path = await video_ai.create_video(
            body.prompt,
            OPENROUTER_API_KEY,
            OPENAI_API_KEY,
            STABILITY_API_KEY,
            VOICE_BACKEND
        )
        if not video_path or not os.path.exists(video_path):
            return JSONResponse(content={"error": "Video generation failed"}, status_code=500)

        # Move generated video into public folder
        basename = os.path.basename(video_path)
        dest_path = os.path.join(GEN_VIDEOS_DIR, basename)
        shutil.copy(video_path, dest_path)
        # Optionally remove the original
        try:
            os.remove(video_path)
        except Exception:
            pass

        video_url = f"http://127.0.0.1:8000/generated_videos/{basename}"
        return JSONResponse(content={"found": False, "video_url": video_url})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.post("/chat-with-image")
async def handle_chat_with_image(
    prompt: str = Form(...), 
    file: UploadFile = File(...),
    language: str = Form("en") 
):
    try:
        file_bytes = await file.read()
        mime_type = file.content_type or "image/jpeg"
        return await image_ai.analyze_image(prompt, file_bytes, mime_type, language, OPENROUTER_API_KEY)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    temp_filename = f"temp_{uuid.uuid4()}.mp3"
    try:
        with open(temp_filename, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        if not OPENAI_API_KEY:
             return JSONResponse(content={"error": "OPENAI_API_KEY required for Whisper"}, status_code=500)

        result = await audio_ai.transcribe_audio(temp_filename, OPENAI_API_KEY)
        return result
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
    finally:
        if os.path.exists(temp_filename):
            os.remove(temp_filename)