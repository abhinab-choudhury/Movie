from difflib import get_close_matches

import pandas as pd
from fastapi import FastAPI

app = FastAPI()


def suggest_movie(name, sugg_number=3):
    name = name.strip()
    similarity_df = pd.read_pickle("./notebook/similarity.pkl")
    if name not in similarity_df.columns:
        matches = get_close_matches(name, similarity_df.columns, n=1)
        if not matches:
            return f"Movie '{name}' not found in dataset"
        name = matches[0]  # use closest match

    similar_movies = similarity_df[name].sort_values(ascending=False)
    movies = list(similar_movies.index)[1 : sugg_number + 1]
    return movies


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/api/v1/predict/{name}")
def read_item(name: str):
    prediction = suggest_movie(name, 10)
    return {"suggest_movie": prediction}
