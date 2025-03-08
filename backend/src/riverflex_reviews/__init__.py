import uvicorn
from fastapi import FastAPI
from riverflex_reviews.api import reviews
from riverflex_reviews.config import CONFIG

app = FastAPI()

app.include_router(reviews.router, prefix='/reviews')

if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=CONFIG.PORT)
