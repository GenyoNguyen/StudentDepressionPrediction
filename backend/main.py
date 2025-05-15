from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from pydantic import BaseModel
import uvicorn
import joblib

from preprocess import Preprocess

from scratch.svm import SVMLinear
from scratch.logreg import LogisticRegressionScratch
from scratch.knn import KNN
from scratch.rf import RandomForest

preprocess = Preprocess()

model_dict = {
    "lg_sklearn": joblib.load("models/logreg_sklearn.pkl"),
    "rf_sklearn": joblib.load("models/rf_sklearn.pkl"),
    "knn_sklearn": joblib.load("models/knn_sklearn.pkl"),
    "svm_sklearn": joblib.load("models/svm_sklearn.pkl"),
    "lg_scratch": LogisticRegressionScratch(model_path="models/logreg_scratch.pkl"),
    "knn_scratch": KNN(model_path="models/knn_scratch.pkl"),
    "rf_scratch": RandomForest(model_path="models/rf_scratch.pkl"),
    "svm_scratch": SVMLinear(model_path="models/svm_scratch.pkl")
}

app = FastAPI(
    title="Student Depression Prediction API",
    description="API for predicting and analyzing student depression levels",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request/response
class PredictionRequest(BaseModel):
    academic_pressure: int
    age: int
    cgpa: float
    degree: str
    dietary_habits: str
    family_history: str
    financial_stress: int
    gender: str
    model: str
    sleep_duration: int
    study_satisfaction: int
    suicidal_thoughts: str
    work_study_hours: int

class PredictionResponse(BaseModel):
    prediction: bool

@app.get("/")
async def root():
    return {"message": "Welcome to Student Depression Prediction API"}

@app.post("/predict")
async def predict_depression(request: PredictionRequest):
    print(request)
    key_mapping = {
        "academic_pressure": "Academic Pressure",
        "age": "Age",
        "cgpa": "CGPA",
        "degree": "Degree",
        "dietary_habits": "Dietary Habits",
        "family_history": "Family History of Mental Illness",
        "financial_stress": "Financial Stress",
        "gender": "Gender",
        "model": "Model",
        "sleep_duration": "Sleep Duration",
        "study_satisfaction": "Study Satisfaction",
        "suicidal_thoughts": "Have you ever had suicidal thoughts ?",
        "work_study_hours": "Work/Study Hours"
    }
    
    df = pd.DataFrame([request.model_dump()])
    df = df.rename(columns=key_mapping)
    model = df["Model"][0]
    print(model)
    df = df.drop(columns=["Model"])
    df = df.reindex(sorted(df.columns), axis=1)
    df_encoded = preprocess.preprocess(df)

    prediction = model_dict[model].predict(df_encoded)
    print(prediction)

    return PredictionResponse(prediction=prediction)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)