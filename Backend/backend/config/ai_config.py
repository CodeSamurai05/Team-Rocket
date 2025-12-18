AI_CONFIG = {
    "openai": {
        "api_key": "your-key",
        "model": "gpt-4-turbo",
        "max_tokens": 2000
    },
    "anthropic": {
        "api_key": "your-key",
        "model": "claude-3-sonnet"
    },
    "whisper": {
        "model": "whisper-1",
        "language": "hi"  # Hindi
    },
    "rag": {
        "ncert_paths": ["data/ncert/class9.pdf", "data/ncert/class10.pdf"],
        "similarity_threshold": 0.7
    },
    "cache": {
        "enabled": True,
        "ttl": 3600  # 1 hour
    }
}