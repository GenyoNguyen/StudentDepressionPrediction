# Student Depression Prediction API

This is the backend API for the Student Depression Prediction System, built with FastAPI.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Application

1. Start the development server:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, you can access:
- Interactive API documentation (Swagger UI): `http://localhost:8000/docs`
- Alternative API documentation (ReDoc): `http://localhost:8000/redoc`

## Available Endpoints

- `GET /`: Welcome message
- `POST /predict`: Submit student data for depression prediction
- `GET /health`: Health check endpoint

## Development

The project structure is organized as follows:
```
backend/
├── main.py           # Main FastAPI application
├── config.py         # Configuration settings
├── requirements.txt  # Project dependencies
└── README.md        # This file
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:
```
DEBUG=True
API_VERSION=1.0.0
``` 