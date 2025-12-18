import os
from typing import List
from langchain_openai import OpenAIEmbeddings
from langchain_core.documents import Document
from dotenv import load_dotenv

load_dotenv()

class SmartRetriever:
    def __init__(self, vector_store=None):
        """
        Initialize the Smart Retriever.
        :param vector_store: An initialized VectorStore instance (e.g., from vector_store.py).
        """
        # Embeddings are essential for semantic search (converting text to numbers)
        # Note: Ensure you have a valid OPENAI_API_KEY for embeddings, 
        # or switch to a free alternative like HuggingFaceEmbeddings if needed.
        self.embeddings = OpenAIEmbeddings(
            model="text-embedding-3-small",
            openai_api_key=os.getenv("OPENAI_API_KEY") or os.getenv("OPENROUTER_API_KEY")
        )
        self.vector_store = vector_store

    def retrieve(self, query: str, k: int = 3) -> List[Document]:
        """
        Retrieves the top 'k' most relevant documents for the query.
        """
        if not self.vector_store:
            print("⚠️ Vector Store is not initialized. Cannot perform search.")
            return []

        try:
            print(f"🔍 Searching for: {query}")
            # Semantic search finds meaning, not just keywords
            docs = self.vector_store.similarity_search(query, k=k)
            return docs
        except Exception as e:
            print(f"❌ Retrieval Error: {e}")
            return []

    def get_context_string(self, query: str) -> str:
        """
        Retrieves relevant documents and formats them as a single context string
        for the LLM to read.
        """
        docs = self.retrieve(query)
        
        if not docs:
            return ""
        
        # Format the context nicely
        formatted_context = []
        for doc in docs:
            source = doc.metadata.get('source', 'Unknown Source')
            formatted_context.append(f"--- From {source} ---\n{doc.page_content}")
            
        return "\n\n".join(formatted_context)