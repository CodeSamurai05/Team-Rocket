"""
Fallback handler for when primary AI service fails
"""
import os
from typing import List, Dict
import httpx
import asyncio

class FallbackHandler:
    def __init__(self):
        self.fallback_models = [
            "google/gemma-2-9b-it:free",
            "mistralai/mistral-7b-instruct:free",
            "huggingfaceh4/zephyr-7b-beta:free"
        ]
        self.current_model_index = 0
    
    async def get_response(self, messages: List[Dict[str, str]]) -> str:
        """Try fallback models in sequence"""
        api_key = os.getenv("OPENROUTER_API_KEY")
        
        for i in range(len(self.fallback_models)):
            model = self.fallback_models[(self.current_model_index + i) % len(self.fallback_models)]
            
            try:
                print(f"🔄 Trying fallback model: {model}")
                
                async with httpx.AsyncClient(timeout=30) as client:
                    response = await client.post(
                        "https://openrouter.ai/api/v1/chat/completions",
                        headers={
                            "Authorization": f"Bearer {api_key}",
                            "Content-Type": "application/json"
                        },
                        json={
                            "model": model,
                            "messages": messages,
                            "max_tokens": 500
                        }
                    )
                    
                    if response.status_code == 200:
                        data = response.json()
                        content = data.get("choices", [{}])[0].get("message", {}).get("content", "")
                        
                        # Update to next model for next time
                        self.current_model_index = (self.current_model_index + 1) % len(self.fallback_models)
                        
                        return content.strip()
                    
            except Exception as e:
                print(f"❌ Fallback model {model} failed: {e}")
                await asyncio.sleep(0.5)
        
        raise RuntimeError("All fallback models failed")