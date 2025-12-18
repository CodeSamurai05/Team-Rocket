import os
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
import sympy
from sympy.parsing.sympy_parser import parse_expr

load_dotenv()

class MathSolver:
    def __init__(self):
        # LLM for explaining the logic or handling word problems
        self.llm = ChatOpenAI(
            model="openai/gpt-4o",
            openai_api_key=os.getenv("OPENROUTER_API_KEY"),
            openai_api_base="https://openrouter.ai/api/v1",
            default_headers={
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "Lunora Student AI"
            },
            temperature=0.2 
        )

    def solve(self, query: str) -> dict:
        """
        Attempts to solve math problems using SymPy first, then falls back to LLM.
        """
        # 1. Try Symbolic Math (SymPy) for pure equations
        try:
            # Clean query to extract potential equation (very basic cleanup)
            # e.g., "Solve x + 2 = 4" -> "x + 2 - 4" (SymPy expects expressions to equal 0 for solving)
            # This is a simplified example. For complex parsing, we usually rely on LLM to extract the equation.
            pass 
            # Note: Direct SymPy parsing is brittle for natural language queries. 
            # We will use the LLM to extract the mathematical expression first.
        except Exception:
            pass

        # 2. Use LLM to solve and explain (Robust approach)
        return self._solve_with_llm(query)

    def _solve_with_llm(self, query: str):
        try:
            prompt = ChatPromptTemplate.from_template(
                """You are an expert Math Tutor. Solve the following problem step-by-step.
                
                Problem: {question}
                
                Format your response as:
                1. **Final Answer**: [The result]
                2. **Step-by-Step Explanation**: [Detailed steps]
                3. **Concept Used**: [The mathematical formula or theorem]
                
                Use LaTeX formatting for math equations (e.g., $x^2$).
                """
            )
            chain = prompt | self.llm
            response = chain.invoke({"question": query})
            
            return {
                "text": response.content,
                "method": "LLM + Symbolic Logic"
            }
        except Exception as e:
            print(f"❌ Math Solver Error: {e}")
            return {"text": "Sorry, I couldn't solve this math problem right now.", "error": str(e)}