import os
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_core.documents import Document
from dotenv import load_dotenv

load_dotenv()

class VectorStore:
    def __init__(self):
        # Setup Embeddings
        # यह टेक्स्ट को नंबर्स (Vectors) में बदलता है ताकि सर्च हो सके
        self.embeddings = OpenAIEmbeddings(
            model="text-embedding-3-small",
            openai_api_key=os.getenv("OPENROUTER_API_KEY"),
            openai_api_base="https://openrouter.ai/api/v1",
            check_embedding_ctx_length=False 
        )
        self.index_path = "faiss_index_store"
        self.db = None
        self._load_index()

    def _load_index(self):
        """Loads the FAISS index from disk if available."""
        if os.path.exists(self.index_path):
            try:
                # allow_dangerous_deserialization=True ज़रूरी है लोकल फाइल्स के लिए
                self.db = FAISS.load_local(
                    self.index_path, 
                    self.embeddings, 
                    allow_dangerous_deserialization=True
                )
                print("✅ Vector Store loaded successfully.")
            except Exception as e:
                print(f"⚠️ Error loading Vector Store: {e}")
                self.db = None
        else:
            print("ℹ️ No existing Vector Store found. A new one will be created when documents are added.")

    def add_documents(self, documents: list[Document]):
        """Adds a list of Documents to the vector store and saves it."""
        if not documents:
            return
        
        try:
            if self.db is None:
                self.db = FAISS.from_documents(documents, self.embeddings)
            else:
                self.db.add_documents(documents)
            
            self.save()
            print(f"✅ Added {len(documents)} documents to Vector Store.")
        except Exception as e:
            print(f"❌ Error adding documents: {e}")

    def similarity_search(self, query: str, k: int = 3):
        """Wrapper for similarity search."""
        if self.db:
            return self.db.similarity_search(query, k=k)
        return []

    def save(self):
        """Saves the index locally."""
        if self.db:
            self.db.save_local(self.index_path)