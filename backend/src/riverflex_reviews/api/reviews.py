"""
This module contains the API endpoints for the reviews.
"""
import csv
import io
from typing import List

from fastapi import UploadFile, APIRouter
from pydantic import BaseModel

from riverflex_reviews.vectordb.entity import Review
from riverflex_reviews.vectordb.repository import ReviewRepository

router = APIRouter()

class ReviewDto(BaseModel):
    """ DTO representing a review communicated through the API. """
    reviewer_id: str
    asin: str
    summary: str
    review_text: str
    overall_rating: float
    unix_timestamp: int

@router.post(
    path='/csv',
    summary="Upload Reviews CSV",
    description="Upload a CSV file containing reviews and add them to the database."
)
async def upload_reviews(file: UploadFile):
    """
    Upload a CSV file containing reviews and add them to the database.

    :param UploadFile file: The CSV file containing reviews.
    """
    content = await file.read()
    ReviewRepository().add([
        Review(
            reviewer_id=row['reviewerID'],
            asin=row['asin'],
            summary=row['summary'],
            review_text=row['reviewText'],
            overall_rating=float(row['overall']),
            unix_timestamp=int(row['unixReviewTime']),
        )
        for row in csv.DictReader(io.StringIO(content.decode('utf-8')))
    ])


@router.get(
    path='/search',
    summary="Search Reviews",
    description="Search for reviews based on a query string.",
    response_model=List[ReviewDto]
)
def search_reviews(query: str, k: int = 5):
    """
    Search for reviews based on a query string.

    :param str query: The query string to search for.
    :param int k: The number of top results to return (default is 5).
    :returns: A list of reviews that match the query.
    """
    return [
        ReviewDto(
            reviewer_id=r.reviewer_id,
            asin=r.asin,
            summary=r.summary,
            review_text=r.review_text,
            overall_rating=r.overall_rating,
            unix_timestamp=r.unix_timestamp,
        )
        for r in ReviewRepository().search(query, k)
    ]