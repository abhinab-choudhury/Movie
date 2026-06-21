# Model — Movie Recommendation Backend

FastAPI server that serves movie suggestions using cosine similarity.

## Dataset

Place the TMDB Movie Dataset CSV at `notebook/TMDB_movie_dataset_v11.csv`.  
Download from [Kaggle](https://www.kaggle.com/datasets/asaniczka/tmdb-movies-dataset-2023-930k-movies).

## Train the Model (Jupyter Notebook)

```bash
uv run jupyter notebook notebook/cosine-similarity.ipynb
```

This generates `notebook/similarity.pkl`.

## Run the Server

```bash
uv run uvicorn main:app --port 8000 --reload
```
