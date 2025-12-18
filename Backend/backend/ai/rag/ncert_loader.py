import os
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from backend.ai.rag.vector_store import VectorStore

class NCERTKnowledgeBase:
    def __init__(self):
        self.vector_store = VectorStore()
        # Text splitter to break large PDFs into smaller chunks
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )

    def load_pdf(self, pdf_path: str):
        """Loads a PDF, splits it, and adds it to the Vector Store."""
        if not os.path.exists(pdf_path):
            return f"❌ Error: File not found at {pdf_path}"

        print(f"📖 Loading PDF: {pdf_path}...")
        try:
            loader = PyPDFLoader(pdf_path)
            documents = loader.load()
            
            # Split documents into chunks
            chunks = self.text_splitter.split_documents(documents)
            
            # Add metadata (source)
            for chunk in chunks:
                chunk.metadata['source'] = os.path.basename(pdf_path)

            # Add to Vector Store
            self.vector_store.add_documents(chunks)
            return f"✅ Successfully added {len(chunks)} chunks from {os.path.basename(pdf_path)} to knowledge base."
            
        except Exception as e:
            return f"❌ Error loading PDF: {str(e)}"

    def get_relevant_content(self, query: str) -> str:
        """Retrieves relevant context from the vector store."""
        results = self.vector_store.similarity_search(query, k=3)
        
        if not results:
            return ""
            
        # Format the context
        context = ""
        for doc in results:
            context += f"\n--- Source: {doc.metadata.get('source', 'Unknown')} ---\n{doc.page_content}\n"
            
        return context