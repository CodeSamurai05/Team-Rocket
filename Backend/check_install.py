import sys
import importlib.util

print(f"🔍 Python Interpreter: {sys.executable}")
print("-" * 50)

# ये वो मॉडयूल हैं जो एरर दे रहे हैं
modules_to_check = [
    "langchain_openai",
    "langchain",
    "langchain_core",
    "openai",
    "gtts",
    "sympy",
    "dotenv" # python-dotenv ka naam
]

all_good = True

for module in modules_to_check:
    try:
        spec = importlib.util.find_spec(module)
        if spec is None:
            print(f"❌ MISSING: {module}")
            all_good = False
        else:
            print(f"✅ FOUND  : {module}")
    except Exception as e:
        print(f"❌ ERROR  : {module} ({e})")
        all_good = False

print("-" * 50)
if all_good:
    print("🎉 खुशखबरी! सारी लाइब्रेरी इंस्टॉल हैं। VS Code का एरर झूठा (Fake) है।")
else:
    print("⚠️ कुछ लाइब्रेरी सच में गायब हैं। उन्हें दोबारा इंस्टॉल करना होगा।")