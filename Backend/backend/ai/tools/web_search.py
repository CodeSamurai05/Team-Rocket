from langchain_community.tools import DuckDuckGoSearchRun
from langchain_core.tools import Tool

class WebSearcher:
    def __init__(self):
        # DuckDuckGo Search (Free & Fast)
        self.search_tool = DuckDuckGoSearchRun()

    def search(self, query: str):
        """
        Searches the internet for the given query and returns the summary.
        """
        try:
            print(f"🌍 Searching Internet for: {query}...")
            result = self.search_tool.run(query)
            return result
        except Exception as e:
            return f"❌ Internet search failed: {str(e)}"

    def get_tool(self):
        """Returns as a LangChain Tool object for agents."""
        return Tool(
            name="Internet Search",
            func=self.search,
            description="Useful for when you need to answer questions about current events or topics not in your training data."
        )