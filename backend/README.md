# Student Depression Prediction API

This is the backend API for the Student Depression Prediction System, built with FastAPI.

## Setup

1. Create a virtual environment:
```bash
conda create -n <YOUR ENV NAME> python=3.11.1
pip install pip==24.1.2
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Application

1. Start the development server:
```bash
python main.py
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
├── models.py         # Data models and schemas
├── preprocess.py     # Data preprocessing utilities
├── requirements.txt  # Project dependencies
├── models/          # ML model related files
├── scratch/         # Development and testing files
└── README.md        # This file
```