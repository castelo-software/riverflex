"""
This module implements a factory that can generate a langchain graph implementing the Riverflex Reviews assistant.
Currently, the assistant is composed of a single agent that is equipped with a search tool to use a RAG approach and
search through reviews. However, this graph can be easily extended to include additional agents or tools, in order to
be able to complete more complex tasks.
"""
from langchain_core.runnables import Runnable
from langchain_openai import ChatOpenAI
from langchain_openai_api_bridge.core.base_agent_factory import BaseAgentFactory
from langchain_openai_api_bridge.core.create_agent_dto import CreateAgentDto
from langgraph.prebuilt import create_react_agent

from riverflex_reviews.assistant.tools import search_reviews

SYSTEM_PROMPT = """
You are an AI assistant designed to help users find reviews for products. You can search for reviews by entering a 
query. After having retrieved reviews, you must provide a summary to the user. You don't require categories to search
for reviews, you can simply search using any natural language query.
"""


class ReviewAssistant(BaseAgentFactory):
    """
    Factory that generates the langchain graph implementing the Riverflex Reviews assistant.
    This is the top level for the graph, and additional agents can be added here if needed.
    """
    def create_agent(self, dto: CreateAgentDto) -> Runnable:
        """
        Create the Riverflex Reviews assistant graph based on the information provided by the CreateAgentDto. This
        DTO is defined by the langchain_openai_api_bridge library, which simplifies the creation of an OpenAI compatible
        API.

        The exact OpenAI model to use, as well as the model's API key are provided in the DTO. This means that the
        consumer can choose to use their own subscription, instead of relying on one that would be hard-coded in this
        system.

        :param dto: Object containing the parameters needed to create the agent.
        :return: Langchain graph implementing the Riverflex Reviews assistant.
        """
        return create_react_agent(
            model=ChatOpenAI(
                api_key=dto.api_key,
                model=dto.model,
                temperature=dto.temperature,
                streaming=True,
            ),
            tools=[search_reviews],
            prompt=SYSTEM_PROMPT,
        )
