"""
This module contains tools that can be used by the agents in the Riverflex Reviews assistant. Currently, the only tool
available is the search_reviews tool, which searches through reviews for a given query. Additional tools can be added
here to extend the functionality of the assistant.
"""
import json

from langchain_core.tools import tool

from riverflex_reviews.vectordb.repository import ReviewRepository


@tool
def search_reviews(query: str) -> str:
    """
    Searches through reviews for a given query. Reviews whose content is most similar to the query are returned.
    :param query: The query to search for.
    :return: List of reviews whose content is most similar to the query as a JSON array of dictionaries.
    """
    reviews = ReviewRepository().search(query, 5)
    return json.dumps([r.model_dump() for r in reviews])
