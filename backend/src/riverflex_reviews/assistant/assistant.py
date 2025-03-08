from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent
from langchain_openai_api_bridge.core.base_agent_factory import BaseAgentFactory
from langchain_core.runnables import Runnable
from langchain_core.tools import tool
from langgraph.prebuilt import create_react_agent
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from langchain_core.tools import BaseTool, StructuredTool
from langchain_openai_api_bridge.core.create_agent_dto import CreateAgentDto

from riverflex_reviews.assistant.tools import search_reviews
from riverflex_reviews.config import CONFIG

SYSTEM_PROMPT = """
You are an AI assistant designed to help users find reviews for products. You can search for reviews by entering a 
query. After having retrieved reviews, you must provide a summary to the user. You don't require categories to search
for reviews, you can simply search using any natural language query.
"""


class ReviewAssistant(BaseAgentFactory):
    def __init__(self):
        self.agent = create_react_agent(
            model=ChatOpenAI(
                api_key=CONFIG.OPENAI_API_KEY,
                model=CONFIG.CHAT_MODEL,
                temperature=0
            ),
            checkpointer=MemorySaver(),
            tools=[search_reviews],
            prompt=SYSTEM_PROMPT,
        )

    def send_message(self, message: str, thread_id: str) -> str:
        conversation = self.agent.invoke(
            input={'messages': [HumanMessage(message)]},
            config={'configurable': {'thread_id': thread_id}},
        )
        return conversation['messages'][-1].content

    # def create_agent(self, dto: CreateAgentDto) -> Runnable:
    #     return create_react_agent(
    #         model=ChatOpenAI(
    #             api_key=dto.model,
    #             model=dto.api_key,
    #             temperature=dto.temperature,
    #             streaming=True,
    #         ),
    #         tools=[search_reviews],
    #         prompt=SYSTEM_PROMPT,
    #     )
    #