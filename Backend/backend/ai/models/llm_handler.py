import os
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class LLMHandler:
    def __init__(self):
        # OpenRouter Configuration for LangChain
        self.llm = ChatOpenAI(
            model="openai/gpt-4-turbo",  # OpenRouter model ID
            openai_api_key=os.getenv("OPENROUTER_API_KEY"),
            openai_api_base="https://openrouter.ai/api/v1",
            default_headers={
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "Lunora"
            },
            temperature=0.7
        )
        
    async def solve_doubt(self, doubt_text, student_context="General Student"):
        prompt_template = self._create_student_prompt()
        
        # Create the chain
        chain = prompt_template | self.llm
        
        # Invoke the chain
        response = await chain.ainvoke({
            "context": student_context,
            "doubt": doubt_text
        })
        
        return self._format_response(response.content)
    
    def _create_student_prompt(self):
        template = """You are a friendly AI tutor for Indian students.
        
        Student Profile: {context}
        
        Doubt: {doubt}
        
        Provide:
        1. Simple step-by-step explanation in Hindi/English (Hinglish)
        2. Real-world example (Indian context preferred)
        3. Common mistakes to avoid
        4. 2 practice questions
        """
        return ChatPromptTemplate.from_template(template)

    def _format_response(self, text):
        # Basic cleanup or JSON parsing if needed
        return {"text": text}