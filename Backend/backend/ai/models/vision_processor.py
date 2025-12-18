import base64
import os
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage
from dotenv import load_dotenv

load_dotenv()

class VisionProcessor:
    def __init__(self):
        # OpenRouter Configuration for Vision Models
        # Supports models like 'openai/gpt-4o', 'google/gemini-pro-vision', etc.
        self.llm = ChatOpenAI(
            model="openai/gpt-4o",  # Ensure your OpenRouter key supports this or change to available vision model
            openai_api_key=os.getenv("OPENROUTER_API_KEY"),
            openai_api_base="https://openrouter.ai/api/v1",
            default_headers={
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "Lunora Student AI"
            },
            max_tokens=1000,
            temperature=0.5
        )

    async def analyze(self, image_data: bytes, query: str = "Explain this educational image in detail.") -> dict:
        """
        Analyzes the provided image bytes and answers the query.
        """
        try:
            # Convert bytes to base64 string
            base64_image = base64.b64encode(image_data).decode('utf-8')
            
            # Prepare messages for Multimodal LLM
            messages = [
                SystemMessage(
                    content="You are Lunora, an expert AI tutor. Analyze images (diagrams, math problems, text) provided by students and provide clear, step-by-step explanations."
                ),
                HumanMessage(
                    content=[
                        {"type": "text", "text": query},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}"
                            },
                        },
                    ]
                )
            ]

            # Invoke the model
            response = await self.llm.ainvoke(messages)
            
            return {
                "text": response.content,
                "status": "success"
            }
            
        except Exception as e:
            print(f"❌ Vision Processing Error: {e}")
            return {
                "text": "I encountered an error analyzing this image. Please try again with a clearer picture.",
                "error": str(e),
                "status": "failed"
            }