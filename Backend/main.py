from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import openai

# Load .env file
load_dotenv()

# Set API key
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

# Health check route
@app.get("/health")
def health_check():
    return {"status": "Server running"}

# Request model
class Prompt(BaseModel):
    prompt: str

# GPT API route
@app.post("/generate-text")
def generate_text(request: Prompt):
    try:
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": request.prompt}],
            max_tokens=150
        )
        return {"output": response.choices[0].message.content.strip()}
    except Exception as e:
        return {"error": str(e)}
