import os
import sys

# Path setup to find backend modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from backend.ai.rag.ncert_loader import NCERTKnowledgeBase

def main():
    rag = NCERTKnowledgeBase()
    
    print("📚 Lunora Knowledge Ingestion Tool")
    print("----------------------------------")
    
    pdf_path = input("Enter the path to your PDF file (e.g., data/chapter1.pdf): ").strip()
    
    # Remove quotes if user added them (common in Windows copy-paste)
    pdf_path = pdf_path.replace('"', '').replace("'", "")
    
    if os.path.exists(pdf_path):
        result = rag.load_pdf(pdf_path)
        print(result)
    else:
        print("❌ File does not exist. Please check the path.")

if __name__ == "__main__":
    main()