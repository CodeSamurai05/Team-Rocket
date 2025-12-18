import os
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv

load_dotenv()

class CodeAnalyzer:
    def __init__(self):
        # OpenRouter Configuration for Code Models
        # We use a model good at coding (like gpt-4-turbo or claude-3-opus if available via OpenRouter)
        self.llm = ChatOpenAI(
            model="openai/gpt-4-turbo",  # or "anthropic/claude-3-opus" if available
            openai_api_key=os.getenv("OPENROUTER_API_KEY"),
            openai_api_base="https://openrouter.ai/api/v1",
            default_headers={
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "Lunora Student AI"
            },
            temperature=0.2 # Lower temperature for precise code generation
        )

    async def analyze_code(self, code_snippet: str, language: str = "python") -> dict:
        """
        Analyzes code for quality, potential bugs, and suggests improvements.
        """
        try:
            prompt = ChatPromptTemplate.from_template(
                """You are an expert Senior Software Engineer and Code Mentor.
                
                Analyze the following {language} code snippet:
                
                ```
                {code}
                ```
                
                Provide a structured analysis in JSON format with the following keys:
                1. "summary": Brief explanation of what the code does.
                2. "bugs": List of potential bugs or errors (if any).
                3. "improvements": List of suggestions to make the code cleaner or more efficient.
                4. "rating": A score out of 10 for code quality.
                
                Keep the tone encouraging but professional.
                """
            )
            chain = prompt | self.llm
            response = await chain.ainvoke({"language": language, "code": code_snippet})
            
            # Since we asked for JSON structure in text, we might need to parse it or just return the text
            # For simplicity, returning the content directly. 
            # Ideally, use JsonOutputParser for strict JSON.
            return {"analysis": response.content}

        except Exception as e:
            print(f"❌ Code Analysis Error: {e}")
            return {"error": str(e)}

    async def debug_code(self, code_snippet: str, error_message: str = "") -> dict:
        """
        Identifies the error in the code and provides a fixed version.
        """
        try:
            prompt_text = """You are an expert Code Debugger.
            
            Here is a broken code snippet:
            ```
            {code}
            ```
            """
            
            if error_message:
                prompt_text += f"\nError Message encountered:\n{error_message}\n"
                
            prompt_text += """
            Task:
            1. Identify the root cause of the bug.
            2. Provide the FIXED code snippet.
            3. Explain why the fix works.
            
            Output Format:
            Markdown text with the fixed code block.
            """
            
            prompt = ChatPromptTemplate.from_template(prompt_text)
            chain = prompt | self.llm
            response = await chain.ainvoke({"code": code_snippet})
            
            return {"debug_result": response.content}

        except Exception as e:
            print(f"❌ Debugging Error: {e}")
            return {"error": str(e)}

    async def explain_code(self, code_snippet: str) -> dict:
        """
        Explains code line-by-line for students.
        """
        try:
            prompt = ChatPromptTemplate.from_template(
                """You are a patient Computer Science Teacher.
                
                Explain the following code snippet simply for a beginner student:
                ```
                {code}s
                ```
                
                Break it down logic by logic. Use analogies if possible.
                """
            )
            chain = prompt | self.llm
            response = await chain.ainvoke({"code": code_snippet})
            
            return {"explanation": response.content}

        except Exception as e:
            print(f"❌ Code Explanation Error: {e}")
            return {"error": str(e)}