# Riverflex Product Review RAG Prototype

This repository contains a prototype implementation of a RAG (Retrieval-Augmented Generation) application that allows users to provide a dataset containing product reviews and "talk" with the data using an LLM (Large Language Model) through a chat interface.

This README file contains information on how to run the application. For more detailed information about the structure of the project, design choices and required improvements for a production-ready version, please refer to the [documentation](./docs):

1. [Architecture](./docs/Architecture.md)
2. [Potential Improvements](./docs/Potential-Improvements.md)
3. [Project Structure](./docs/Project-Structure.md)

## Requirements

In order to run the application locally, the following requirements must be met:
- Docker must be installed on the machine. Docker composed is used to spin up the containers that run the application.
- An OpenAI API key with at least $0.10 in credits. OpenAI is used to embed the data and interact with the LLM. No support for other LLM providers is currently implemented.

## Running the application

The application will require access to the OpenAI API key. To do this, obtain a key and store in a file named `.env` in the root of the project. The file should contain the following line:

```bash
OPENAI_API_KEY=<your-api-key>
```

To run the application, execute the following command in the root of the project:

```bash
docker-compose up
```

The application will be available at `http://localhost:3000`.

## Usage

Before chatting with the LLM, navigate to the ["Import"](http://localhost:3000/import) page and upload a CSV file containing product reviews. The file must match the exact same structure as the [Kaggle example](https://www.kaggle.com/datasets/mehmetisik/amazon-review?resource=download).

After importing the data, navigate to the ["Chat"](http://localhost:3000/) page to start a conversation with the LLM. The LLM will be able to answer questions about the data and generate new reviews based on the input.