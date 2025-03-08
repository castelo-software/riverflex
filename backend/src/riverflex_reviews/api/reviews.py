import csv
import io

import uvicorn
from fastapi import UploadFile, APIRouter

from riverflex_reviews.vectordb.entity import Review
from riverflex_reviews.vectordb.repository import ReviewRepository

router = APIRouter()


@router.post('/reviews/csv')
async def upload_reviews(file: UploadFile):
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


@router.get('/reviews/search')
def search_reviews(query: str, k: int = 5):
    return ReviewRepository().search(query, k)
