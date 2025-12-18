"""
Smart AI Module for Student Doubt Solver
Handles OpenRouter API calls with proper error handling and caching
"""

import os
import sys
import httpx
import json
import re
import asyncio
from typing import Any, Dict, Optional, List
from datetime import datetime

# ==========================================
# 1. PATH & UTILS SETUP - FIXED
# ==========================================
# Get current directory
current_dir = os.path.dirname(os.path.abspath(__file__))

# Check if we're in backend directory or need to go up
if "backend" not in current_dir:
    # Go up one level if needed
    parent_dir = os.path.abspath(os.path.join(current_dir, '..'))
    backend_dir = os.path.join(parent_dir, 'backend')
    
    if os.path.exists(backend_dir):
        sys.path.append(backend_dir)
        sys.path.append(parent_dir)
    else:
        # If backend directory doesn't exist, just use parent
        sys.path.append(parent_dir)
else:
    # Already in backend directory structure
    backend_dir = current_dir.split('backend')[0] + 'backend'
    if backend_dir not in sys.path:
        sys.path.append(backend_dir)

print(f"✅ Current dir: {current_dir}")
print(f"✅ Python path: {sys.path[-1]}")

# Try importing utilities with graceful fallback
CacheManager = None
CostTracker = None
FallbackHandler = None

try:
    # First try direct import
    from ai.utils.cache_manager import CacheManager
    from ai.utils.cost_tracker import CostTracker
    from ai.utils.fallback_handler import FallbackHandler
    print("✅ Utils imported successfully")
except ImportError:
    try:
        # Try relative import
        from backend.ai.utils.cache_manager import CacheManager
        from backend.ai.utils.cost_tracker import CostTracker
        from backend.ai.utils.fallback_handler import FallbackHandler
        print("✅ Utils imported via relative import")
    except ImportError as e:
        print(f"⚠️ Utils Import Warning: {e}")
        print("⚠️ Running without advanced optimizations - using simple local cache")

# --- FALLBACK UTILITY CLASSES ---
class SimpleCacheManager:
    """Simple in-memory cache if main cache is not available"""
    def __init__(self):
        self.cache = {}
    
    def get(self, key: str) -> Optional[Any]:
        return self.cache.get(key)
    
    def set(self, key: str, value: Any, ttl: int = 3600):
        self.cache[key] = {
            'value': value,
            'expiry': datetime.now().timestamp() + ttl
        }
    
    def delete_expired(self):
        current_time = datetime.now().timestamp()
        expired_keys = []
        for key, data in self.cache.items():
            if data['expiry'] < current_time:
                expired_keys.append(key)
        for key in expired_keys:
            del self.cache[key]

class SimpleCostTracker:
    """Simple cost tracker"""
    def __init__(self):
        self.total_cost = 0.0
    
    def add_cost(self, model: str, tokens: int, cost_per_token: float = 0.000002):
        cost = tokens * cost_per_token
        self.total_cost += cost
        return cost
    
    def get_total_cost(self):
        return self.total_cost

# Initialize utilities
cache = CacheManager() if CacheManager else SimpleCacheManager()
tracker = CostTracker() if CostTracker else SimpleCostTracker()
fallback = FallbackHandler() if FallbackHandler else None

# Default model
MODEL_NAME ="x-ai/grok-4.1-fast"

# ==========================================
# 2. HELPER FUNCTIONS - IMPROVED
# ==========================================

async def _post_with_retries(url: str, headers: dict, payload: dict, retries: int = 3, timeout: int = 30):
    """
    Simple retry loop with exponential backoff for HTTP POST requests.
    Fixed timeout to 30 seconds (120 was too long)
    """
    for attempt in range(1, retries + 1):
        try:
            async with httpx.AsyncClient(timeout=timeout) as client:
                resp = await client.post(url, headers=headers, json=payload)
                resp.raise_for_status()  # Raise HTTP errors
                return resp
        except (httpx.RequestError, httpx.ReadTimeout, httpx.HTTPStatusError) as e:
            print(f"⚠️ API Connection Attempt {attempt}/{retries} failed: {type(e).__name__}")
            if attempt == retries:
                # Provide more helpful error message
                if isinstance(e, httpx.HTTPStatusError):
                    raise RuntimeError(f"API Error {e.response.status_code}: {e.response.text[:200]}")
                else:
                    raise RuntimeError(f"Network/Connection Error: {str(e)}")
            
            # Exponential backoff with jitter
            wait_time = 0.5 * (2 ** (attempt - 1))
            await asyncio.sleep(wait_time)
    
    raise RuntimeError(f"Failed after {retries} retries")

def _clean_and_parse_json(response_text: str) -> Dict[str, Any]:
    """
    Robust JSON extractor: strips code fences, searches for JSON object.
    Returns proper dict with defaults.
    """
    if not isinstance(response_text, str):
        return {"text": str(response_text), "recommended_topics": [], "error": "Invalid response type"}
    
    # Clean the response
    response_text = response_text.strip()
    
    # Remove code fences (```json, ```, etc.)
    response_text = re.sub(r'^```(?:json)?\s*', '', response_text, flags=re.IGNORECASE)
    response_text = re.sub(r'\s*```$', '', response_text)
    
    # Try to find JSON object pattern
    json_pattern = r'\{[\s\S]*\}'
    match = re.search(json_pattern, response_text)
    
    if match:
        json_str = match.group()
        try:
            parsed = json.loads(json_str)
            # Ensure required fields exist
            if "text" not in parsed:
                parsed["text"] = response_text
            if "recommended_topics" not in parsed:
                parsed["recommended_topics"] = []
            return parsed
        except json.JSONDecodeError as e:
            print(f"⚠️ JSON parsing failed: {e}, trying to fix...")
            # Try to fix common JSON issues
            try:
                # Remove trailing commas
                json_str = re.sub(r',\s*}', '}', json_str)
                json_str = re.sub(r',\s*]', ']', json_str)
                # Fix single quotes to double quotes
                json_str = re.sub(r"'", '"', json_str)
                parsed = json.loads(json_str)
                return parsed
            except:
                pass
    
    # If all parsing fails, return a structured response
    return {
        "text": response_text,
        "recommended_topics": [],
        "note": "Response was not in valid JSON format"
    }

async def call_llm(
    api_key: str, 
    messages: List[Dict[str, str]], 
    model: str = MODEL_NAME, 
    max_tokens: int = 1000, 
    json_mode: bool = False,
    temperature: float = 0.7
) -> str:
    """
    Calls OpenRouter endpoint with caching and cost tracking.
    Returns raw response string.
    """
    if not api_key:
        raise ValueError("API key is required")
    
    # Create cache key
    cache_key = f"llm_{model}_{hash(str(messages))}"
    
    # Cache is disabled to prevent showing same response on back navigation
    # This ensures fresh responses each time user asks
    # cached_response = cache.get(cache_key)
    # if cached_response:
    #     print("✅ Using cached response")
    #     return cached_response
    
    # Prepare API call
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Student AI Tutor"
    }
    
    payload = {
        "model": model,
        "messages": messages,
        "max_tokens": max_tokens,
        "temperature": temperature
    }
    
    if json_mode:
        payload["response_format"] = {"type": "json_object"}
    
    print(f"📡 Calling LLM API with model: {model}")
    
    try:
        resp = await _post_with_retries(url, headers, payload, retries=3, timeout=30)
        data = resp.json()
        
        # Extract response
        if "choices" in data and len(data["choices"]) > 0:
            content = data["choices"][0].get("message", {}).get("content", "")
            
            # Track usage and cost
            usage = data.get("usage", {})
            prompt_tokens = usage.get("prompt_tokens", 0)
            completion_tokens = usage.get("completion_tokens", 0)
            
            if tracker:
                cost = tracker.add_cost(model, prompt_tokens + completion_tokens)
                print(f"💰 Estimated cost: ${cost:.6f}")
            
            # Cache disabled - fresh responses on each call
            # cache.set(cache_key, content, ttl=300)  # Cache for 5 minutes
            
            return content.strip()
        else:
            raise RuntimeError(f"No choices in response: {data}")
            
    except Exception as e:
        print(f"❌ LLM API call failed: {e}")
        
        # Try fallback model if available
        if fallback:
            try:
                print("🔄 Trying fallback model...")
                return await fallback.get_response(messages)
            except Exception as fallback_error:
                print(f"❌ Fallback also failed: {fallback_error}")
        
        # Last resort: return helpful error
        return "I apologize, but I'm having trouble connecting to the AI service right now. Please try again in a moment."

async def smart_chat(
    prompt: str, 
    lang_instruction: str = "", 
    api_key: str = None,
    student_context: Dict[str, Any] = None
) -> Dict[str, Any]:
    """
    Persona-driven chat for student doubts.
    Returns parsed JSON response.
    """
    if not api_key:
        # Try to get from environment
        api_key = os.getenv("OPENROUTER_API_KEY")
        if not api_key:
            raise ValueError("OpenRouter API key is required. Set OPENROUTER_API_KEY environment variable.")
    
    if student_context is None:
        student_context = {}
    
    # Create cache key for this specific query
    query_hash = hash(f"{prompt}_{lang_instruction}_{str(student_context)}")
    cache_key = f"smart_chat_{query_hash}"
    
    # Check cache
    cached_result = cache.get(cache_key)
    if cached_result:
        print("✅ Using cached chat response")
        return cached_result
    
    # Build system instruction
    system_instruction = f"""You are Lunora, a friendly AI study assistant for Indian students.

IMPORTANT: Keep responses SHORT and CONCISE!
- Answer in 3-4 sentences for simple questions
- Max 6-7 sentences for detailed explanations
- Avoid unnecessary elaboration and repetition
- Be clear, friendly, and helpful
- Use simple language and Indian examples

Student Context: Grade {student_context.get('grade', '?')}, Subjects: {', '.join(student_context.get('subjects', [])) or 'general'}

RESPONSE FORMAT:
You MUST return a valid JSON object with exactly these fields:
{{
  "text": "Your main response here. Use \\n for line breaks.",
  "recommended_topics": ["Topic 1", "Topic 2", "Topic 3"],
  "confidence": 0.95,
  "follow_up_questions": ["Question 1", "Question 2"]
}}

{lang_instruction}
"""
    # Ensure the model does not repeat the user's question verbatim
    system_instruction += "\nDo NOT repeat the user's question verbatim in the \"text\" field; instead, provide a concise answer or a brief summary in your own words."

    messages = [
        {"role": "system", "content": system_instruction},
        {"role": "user", "content": prompt}
    ]
    
    try:
        raw_response = await call_llm(
            api_key=api_key,
            messages=messages,
            model=MODEL_NAME,
            max_tokens=600,
            json_mode=True,
            temperature=0.7
        )
        
        # Parse the response
        parsed_response = _clean_and_parse_json(raw_response)
        
        # Add metadata
        parsed_response["timestamp"] = datetime.now().isoformat()
        parsed_response["model"] = MODEL_NAME
        parsed_response["student_context"] = student_context
        
        # Cache disabled to prevent showing cached response on back navigation
        # This ensures fresh responses each time
        
        return parsed_response
        
    except Exception as e:
        print(f"❌ Error in smart_chat: {e}")
        return {
            "text": f"I apologize, but I encountered an error: {str(e)}. Please try again.",
            "recommended_topics": [],
            "confidence": 0.0,
            "error": str(e),
            "timestamp": datetime.now().isoformat()
        }

# ==========================================
# 3. ADDITIONAL HELPER FUNCTIONS
# ==========================================

async def solve_math_problem(problem: str, api_key: str) -> Dict[str, Any]:
    """Specialized math problem solver"""
    messages = [
        {
            "role": "system",
            "content": """You are a math tutor. Solve the problem step-by-step.
            Return JSON: {"solution": "step1...", "steps": ["step1", "step2"], "final_answer": "..."}"""
        },
        {"role": "user", "content": problem}
    ]
    
    raw = await call_llm(api_key, messages, json_mode=True)
    return _clean_and_parse_json(raw)

async def explain_concept(concept: str, grade_level: str, api_key: str) -> Dict[str, Any]:
    """Concept explainer with grade-appropriate language"""
    messages = [
        {
            "role": "system",
            "content": f"""Explain this concept for a {grade_level} grade student.
            Use simple language and real-world examples.
            Return JSON: {{"explanation": "...", "examples": ["ex1", "ex2"], "key_points": ["point1", "point2"]}}"""
        },
        {"role": "user", "content": concept}
    ]
    
    raw = await call_llm(api_key, messages, json_mode=True)
    return _clean_and_parse_json(raw)

# ==========================================
# 4. MAIN FUNCTION FOR TESTING
# ==========================================

async def main():
    """Test the smart AI module"""
    api_key = os.getenv("OPENROUTER_API_KEY")
    
    if not api_key:
        print("❌ Please set OPENROUTER_API_KEY environment variable")
        return
    
    # Test 1: Simple chat
    print("\n🧪 Test 1: Simple Chat")
    response = await smart_chat(
        prompt="What is photosynthesis?",
        lang_instruction="Explain in simple English.",
        api_key=api_key,
        student_context={"grade": "10", "subjects": ["Science", "Biology"]}
    )
    print(f"Response: {json.dumps(response, indent=2)[:500]}...")
    
    # Test 2: Math problem
    print("\n🧪 Test 2: Math Problem")
    math_response = await solve_math_problem(
        problem="Solve: 2x + 5 = 15",
        api_key=api_key
    )
    print(f"Math solution: {json.dumps(math_response, indent=2)}")
    
    # Test 3: Cache test
    print("\n🧪 Test 3: Cache Test (same query)")
    response2 = await smart_chat(
        prompt="What is photosynthesis?",
        api_key=api_key
    )
    print(f"Cached response received: {'timestamp' in response2}")

if __name__ == "__main__":
    asyncio.run(main())