# Movie Recommendation System

A full-stack movie discovery app with a **FastAPI** backend (cosine similarity recommendation engine) and a **React + TypeScript** frontend powered by the TMDB API.

---

## Features

- Movie/TV search with debouncing via TMDB API
- Quick-search dialog (`Cmd/Ctrl+K`)
- Movie detail pages with cast, trailers, and recommendations
- Cosine-similarity based movie suggestions (trained on 50K TMDB movies)
- Wishlist (localStorage)
- Responsive UI with Tailwind CSS

---

## Getting Started

### Prerequisites

- Python **3.12+** and [uv](https://docs.astral.sh/uv/) (`curl -LsSf https://astral.sh/uv/install.sh | sh`)
- Node.js **18+** and npm
- A [TMDB API token](https://developer.themoviedb.org/reference/intro/getting-started)

### 1. Dataset

The model uses the [TMDB Movie Dataset v11](https://www.kaggle.com/datasets/asaniczka/tmdb-movies-dataset-2023-930k-movies) (930K+ movies).  
The prepared CSV is located at `model/notebook/TMDB_movie_dataset_v11.csv` (~617 MB).  
If missing, download it from Kaggle and place it in `model/notebook/`.

### 2. Train the Similarity Model (Jupyter Notebook)

```bash
cd model
uv run jupyter notebook notebook/cosine-similarity.ipynb
```

Run all cells — this will:
- Load and preprocess the CSV (sample 50K rows)
- Encode genres (multi-label binarization) and languages (one-hot)
- Scale numeric features (`vote_average`, `runtime`, `popularity`)
- Generate `notebook/similarity.pkl` (~81 MB) containing `titles` and `feature_matrix`

A precomputed `similarity.pkl` is already included, so you can skip this step unless you want to retrain.

### 3. Run the Backend (FastAPI Server)

```bash
cd model
uv run uvicorn main:app --port 8000 --reload
```

The server starts at **http://localhost:8000**.  
Try it: `curl http://localhost:8000/api/v1/predict/Inception`

### 4. Run the Frontend (React Client)

```bash
cd client
cp .env.example .env   # then add your VITE_TMDB_TOKEN
npm install
npm run dev
```

The client starts at **http://localhost:5173**.

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Health check |
| GET | `/api/v1/predict/{name}` | Returns top 10 similar movie titles |

---

## Project Structure

```
Movie/
├── model/              # Python backend (FastAPI + ML)
│   ├── main.py
│   ├── pyproject.toml
│   ├── notebook/
│   │   ├── cosine-similarity.ipynb   # Jupyter notebook for training
│   │   ├── TMDB_movie_dataset_v11.csv
│   │   └── similarity.pkl
│   └── README.md
├── client/             # React + TypeScript frontend
│   ├── src/
│   ├── package.json
│   └── README.md
└── README.md
```
