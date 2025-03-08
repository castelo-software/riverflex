from typing import List

from langchain_chroma.vectorstores import Chroma
from langchain_openai.embeddings import OpenAIEmbeddings

from riverflex_reviews.config import CONFIG
from riverflex_reviews.lib import singleton
from riverflex_reviews.vectordb.entity import Review


@singleton
class ReviewRepository:
    """
    This repository provides an interface to the 'reviews' collection in the vector database. It makes it possible for
    the application to manage the data stored in the collection and search through it.
    """
    def __init__(self):
        self.client = Chroma(
            collection_name='reviews',
            embedding_function=OpenAIEmbeddings(
                model=CONFIG.EMBEDDING_FUNCTION,
                api_key=CONFIG.OPENAI_API_KEY,
            ),
            persist_directory=CONFIG.CHROMADB_PATH,
        )

    def add(self, reviews: List[Review]) -> None:
        """
        Add reviews to the repository.

        :param List[Review] reviews: List of reviews to add.
        """
        self.client.add_documents([r.to_document() for r in reviews])

    def search(self, query: str, k: int = 10) -> List[Review]:
        """
        Search for reviews based on a query string.

        :param str query: The query string to search for.
        :param int k: Number of results to return.
        :return: List of reviews whose content is most similar to the query.
        """
        results = self.client.similarity_search(query, k=k)
        return [Review.from_document(d) for d in results]
