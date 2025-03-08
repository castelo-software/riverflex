from dotenv import load_dotenv

from riverflex_reviews.lib import getenv, singleton


@singleton
class Config:
    """
    Singleton class that holds the configuration for the application. It reads the configuration from environment
    variables, raising a ValueError if a required variable is not set and no default value is provided. Environment
    variables will be read from a .env file if it exists in the root of the project.
    """

    def __init__(self):
        load_dotenv()

        self.PORT = getenv('PORT', '443')
        self.OPENAI_API_KEY = getenv('OPENAI_API_KEY')
        self.CHROMADB_PATH = getenv('CHROMADB_PATH', './chroma_data')
        self.EMBEDDING_FUNCTION = getenv('EMBEDDING_FUNCTION', 'text-embedding-3-small')
        self.CHAT_MODEL = getenv('CHAT_MODEL', 'gpt-4o-mini')
