FROM python:3.12-slim

# Install system dependencies
RUN apt-get update
RUN apt-get install -y --no-install-recommends gcc
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/*

# Install python dependencies
WORKDIR /app
COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app/src
ENV PORT=3001

# Expose the port the app runs on
EXPOSE $PORT

# Copy the source code
COPY ./src ./src

# Command to run the application
CMD ["python", "src/riverflex_reviews/main.py"]

