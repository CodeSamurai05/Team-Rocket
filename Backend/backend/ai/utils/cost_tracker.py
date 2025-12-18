"""
Simple cost tracker for API calls
"""
import json
import os
from datetime import datetime
from typing import Dict

class CostTracker:
    def __init__(self, log_file: str = None):
        if log_file is None:
            log_dir = os.path.join(os.path.dirname(__file__), '../../logs')
            os.makedirs(log_dir, exist_ok=True)
            log_file = os.path.join(log_dir, 'costs.json')
        
        self.log_file = log_file
        self.costs = []
        
        # Load existing costs
        if os.path.exists(self.log_file):
            try:
                with open(self.log_file, 'r') as f:
                    self.costs = json.load(f)
            except:
                self.costs = []
    
    def add_cost(self, model: str, tokens: int, cost_per_token: float = None):
        # Default costs per token (approximate)
        model_costs = {
            "llama-3.1-70b": 0.0000008,
            "grok-4.1": 0.000001,
            "gpt-4": 0.00003,
            "default": 0.000001
        }
        
        if cost_per_token is None:
            cost_per_token = model_costs.get(model, model_costs["default"])
        
        cost = tokens * cost_per_token
        
        cost_entry = {
            "model": model,
            "tokens": tokens,
            "cost": cost,
            "timestamp": datetime.now().isoformat(),
            "cost_per_token": cost_per_token
        }
        
        self.costs.append(cost_entry)
        
        # Save to file
        try:
            with open(self.log_file, 'w') as f:
                json.dump(self.costs, f, indent=2)
        except:
            pass
        
        return cost
    
    def get_total_cost(self) -> float:
        return sum(entry["cost"] for entry in self.costs)
    
    def get_daily_cost(self, date_str: str = None) -> float:
        if date_str is None:
            date_str = datetime.now().strftime("%Y-%m-%d")
        
        daily_cost = 0
        for entry in self.costs:
            if entry["timestamp"].startswith(date_str):
                daily_cost += entry["cost"]
        
        return daily_cost