import os
import sys

# यह वो पूरा स्ट्रक्चर है जो आप चाहते हैं
structure = [
    "backend/ai/__init__.py",
    "backend/ai/models/llm_handler.py",
    "backend/ai/models/vision_processor.py",
    "backend/ai/models/speech_handler.py",
    "backend/ai/models/math_solver.py",
    "backend/ai/models/code_analyzer.py",
    "backend/ai/rag/vector_store.py",
    "backend/ai/rag/ncert_loader.py",
    "backend/ai/rag/retriever.py",
    "backend/ai/video_generator/manim_engine.py",
    "backend/ai/video_generator/diagram_maker.py",
    "backend/ai/video_generator/voice_synthesizer.py",
    "backend/ai/utils/cache_manager.py",
    "backend/ai/utils/cost_tracker.py",
    "backend/ai/utils/fallback_handler.py",
    "backend/services/ai_orchestrator.py",
    "backend/services/doubt_solver.py",
    "backend/services/personalization.py",
    "backend/config/ai_config.py",
    "backend/config/database.js",
    "requirements.txt" # Added requirements file
]

# AI Project ke liye zaroori libraries
requirements_content = """fastapi
uvicorn
python-dotenv
httpx
gtts
moviepy
pillow
manim
openai
langchain
langchain-openai
"""

def create_structure():
    # 1. Check Current Directory
    cwd = os.getcwd()
    print(f"📍 Current Working Directory: {cwd}")
    print("🚀 Starting creation process...\n")

    for file_path in structure:
        try:
            # Full path banayein taaki confusion na ho
            full_path = os.path.join(cwd, file_path)
            directory = os.path.dirname(full_path)
            
            # Directory banayein
            if directory and not os.path.exists(directory):
                os.makedirs(directory, exist_ok=True)
                print(f"📁 Created Dir : {directory}")
            
            # File banayein
            if not os.path.exists(full_path):
                with open(full_path, 'w', encoding='utf-8') as f:
                    # Agar requirements.txt hai to usme content daalein
                    if file_path == "requirements.txt":
                        f.write(requirements_content)
                    else:
                        pass 
                print(f"📄 Created File: {file_path}")
            else:
                print(f"ℹ️  Exists     : {file_path}")
                
        except Exception as e:
            print(f"❌ Error creating {file_path}: {e}")

    print("\n✅ Process Completed!")

if __name__ == "__main__":
    create_structure()