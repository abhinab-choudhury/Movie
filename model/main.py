from difflib import get_close_matches
import pickle

import numpy as np
import uvicorn
from fastapi import FastAPI

app = FastAPI()

with open("./notebook/similarity.pkl", "rb") as f:
    data = pickle.load(f)
titles = data["titles"]
feature_matrix = data["feature_matrix"]


def cosine_similarity(vector, matrix):
    norm_v = np.sqrt(np.dot(vector, vector))
    norm_m = np.sqrt(np.sum(matrix * matrix, axis=1))
    dot = np.dot(matrix, vector)
    return dot / (norm_m * norm_v + 1e-8)


def suggest_movie(name, sugg_number=3):
    name = name.strip().title()
    if name not in titles.values:
        matches = get_close_matches(name, titles, n=1)
        if not matches:
            return f"Movie '{name}' not found in dataset"
        name = matches[0]
    idx = titles[titles == name].index[0]
    vec = feature_matrix[idx]
    sims = cosine_similarity(vec, feature_matrix)
    top = np.argsort(sims)[::-1][1 : sugg_number + 1]
    return titles.iloc[top].tolist()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/api/v1/predict/{name}")
def read_item(name: str):
    prediction = suggest_movie(name, 10)
    return {"suggest_movie": prediction}

