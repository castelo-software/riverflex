from langchain_core.documents import Document
from pydantic import BaseModel


class Review(BaseModel):
    """
    Entity object that models the data stored in the 'reviews' collection of the vector database.

    Args:
        reviewer_id (str): Unique identifier for the reviewer.
        asin (str): Amazon Standard Identification Number for the product.
        review_text (str): The content of the review written by the customer.
        summary (str): A brief summary of the review.
        overall_rating (float): The overall rating given to the product (ranging from 1 to 5 stars).
    """
    reviewer_id: str
    asin: str
    summary: str
    review_text: str
    overall_rating: float
    unix_timestamp: int

    def to_document(self) -> Document:
        """
        Convert the Review object to a Document object that can be stored in the vector database.
        :return Document: The Document object representing the Review.
        """
        return Document(
            id=self.reviewer_id,
            page_content=self.review_text,
            metadata=self.model_dump(exclude={'reviewer_id', 'review_text'}),
        )

    @staticmethod
    def from_document(document: Document) -> 'Review':
        """
        Convert a Document object retrieved from the vector database to a Review object that can be used by the
        application.

        :param Document document: Object retrieved from the vector database.
        :return Review: The Review object created from the Document.
        """
        return Review(
            reviewer_id=document.id,
            review_text=document.page_content,
            **document.metadata,
        )