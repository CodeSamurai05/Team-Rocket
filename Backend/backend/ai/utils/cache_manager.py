"""
Simple cache manager for AI responses
"""
import json
import time
from typing import Any, Optional, Dict
import os

class CacheManager:
    def __init__(self, cache_dir: str = None):
        if cache_dir is None:
            cache_dir = os.path.join(os.path.dirname(__file__), '../../cache')
        
        self.cache_dir = cache_dir
        self.memory_cache = {}
        os.makedirs(cache_dir, exist_ok=True)
    
    def get(self, key: str) -> Optional[Any]:
        # Check memory cache first
        if key in self.memory_cache:
            data = self.memory_cache[key]
            if time.time() < data['expiry']:
                return data['value']
            else:
                del self.memory_cache[key]
        
        # Check disk cache
        cache_file = os.path.join(self.cache_dir, f"{key}.json")
        if os.path.exists(cache_file):
            try:
                with open(cache_file, 'r') as f:
                    data = json.load(f)
                    if time.time() < data['expiry']:
                        # Also load to memory cache
                        self.memory_cache[key] = data
                        return data['value']
                    else:
                        os.remove(cache_file)
            except:
                pass
        
        return None
    
    def set(self, key: str, value: Any, ttl: int = 3600):
        data = {
            'value': value,
            'expiry': time.time() + ttl,
            'created': time.time()
        }
        
        # Save to memory
        self.memory_cache[key] = data
        
        # Save to disk
        cache_file = os.path.join(self.cache_dir, f"{key}.json")
        try:
            with open(cache_file, 'w') as f:
                json.dump(data, f)
        except:
            pass
    
    def clear_expired(self):
        current_time = time.time()
        # Clear memory cache
        expired_keys = []
        for key, data in self.memory_cache.items():
            if current_time > data['expiry']:
                expired_keys.append(key)
        
        for key in expired_keys:
            del self.memory_cache[key]
        
        # Clear disk cache
        for filename in os.listdir(self.cache_dir):
            if filename.endswith('.json'):
                cache_file = os.path.join(self.cache_dir, filename)
                try:
                    with open(cache_file, 'r') as f:
                        data = json.load(f)
                        if current_time > data['expiry']:
                            os.remove(cache_file)
                except:
                    pass