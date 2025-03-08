import uvicorn
from fastapi import FastAPI
from langchain_openai_api_bridge.fastapi import LangchainOpenaiApiBridgeFastAPI

from riverflex_reviews.api import reviews
from riverflex_reviews.assistant.assistant import ReviewAssistant
from riverflex_reviews.config import CONFIG

# Initialize FastAPI app.
app = FastAPI(
    title="Riverflex Reviews Backend",
    version="0.1.0",
    description="This is the backend for the Riverflex Reviews project.",
)

# Add the reviews API to the app. If in the future additional groups of endpoints are needed, they can be added to the
# api package and imported here. Currently, we only require the reviews API to import and search reviews.
app.include_router(reviews.router, prefix='/reviews', tags=['reviews'])

# Add the OpenAI API bridge to the app. This generates an OpenAI compatible API that can be used to interact with the
# ReviewAssistant agent.
bridge = LangchainOpenaiApiBridgeFastAPI(app=app, agent_factory_provider=lambda: ReviewAssistant())
bridge.bind_openai_chat_completion()

if __name__ == '__main__':
    uvicorn.run(app, host='localhost', port=CONFIG.PORT)
