from typing import List

from langchain_chroma.vectorstores import Chroma
from langchain_openai.embeddings import OpenAIEmbeddings

from riverflex_reviews.config import CONFIG
from riverflex_reviews.lib import singleton
from riverflex_reviews.vectordb.entity import Review


@singleton
class ReviewRepository:
    """

    Potential improvements:
    - Chroma DB should be deployed as a service using a separate container. Here we should use the Chroma HTTP client to
        interact with the service, rather than persisting the data locally.
    - We should add logic to split the reviews into smaller chunks before adding to the Chroma DB.
    - It should be possible to update existing documents in the Chroma DB.
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
        self.client.add_documents([r.to_document() for r in reviews])

    def search(self, query: str, k: int = 10) -> List[Review]:
        results = self.client.similarity_search(query, k=k)
        return [Review.from_document(d) for d in results]
