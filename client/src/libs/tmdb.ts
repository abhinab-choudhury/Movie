/** TMDB API types, interfaces, and fetch helpers for movie/TV data. */

export interface TMDBItem {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  title?: string;
  name?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  media_type: string;
}

/** Paginated response wrapper returned by TMDB list endpoints. */
export interface TMDBPage<T = TMDBItem> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

/** Detailed movie/TV response with credits, videos, and metadata appended. */
export interface MovieDetail {
  id: number;
  title: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  runtime: number | null;
  vote_average: number;
  vote_count: number;
  genres: Genre[];
  production_companies: ProductionCompany[];
  credits: {
    cast: CastMember[];
    crew: CrewMember[];
  };
  videos: {
    results: Video[];
  };
  tagline: string;
  status: string;
  original_language: string;
}

/** Shape of items stored in the local wishlist. */
export interface WishlistItem {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;
  media_type: string;
  added_at: number;
}

const TOKEN: string = import.meta.env.VITE_TMDB_TOKEN;
const BASE = 'https://api.themoviedb.org/3';

const headers: Record<string, string> = {
  accept: 'application/json',
  Authorization: `Bearer ${TOKEN}`
};

/** Generic GET helper with auth headers and error handling. */
async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
  return res.json();
}

/** Search both movies and TV shows by query string. */
export function searchMulti(query: string, page = 1): Promise<TMDBPage> {
  return fetchJSON<TMDBPage>(
    `${BASE}/search/multi?query=${encodeURIComponent(query)}&page=${page}&include_adult=false`
  );
}

/** Fetch movie details with credits and videos appended. */
export function getMovie(id: number | string): Promise<MovieDetail> {
  return fetchJSON<MovieDetail>(`${BASE}/movie/${id}?append_to_response=credits,videos`);
}

/** Fetch TV show details with credits and videos appended. */
export function getTV(id: number | string): Promise<MovieDetail> {
  return fetchJSON<MovieDetail>(`${BASE}/tv/${id}?append_to_response=credits,videos`);
}

/** Fetch movie recommendations based on a given movie ID. */
export function getRecommendations(id: number | string): Promise<TMDBPage> {
  return fetchJSON<TMDBPage>(`${BASE}/movie/${id}/recommendations`);
}

/** Fetch similar movies to a given movie ID. */
export function getSimilar(id: number | string): Promise<TMDBPage> {
  return fetchJSON<TMDBPage>(`${BASE}/movie/${id}/similar`);
}

/** Fetch currently trending movies/TV across a time window (day/week). */
export function getTrending(type = 'all', time = 'week'): Promise<TMDBPage> {
  return fetchJSON<TMDBPage>(`${BASE}/trending/${type}/${time}?include_adult=false`);
}

/** Fetch list of movie or TV genres. */
export function getGenreList(type = 'movie'): Promise<{ genres: Genre[] }> {
  return fetchJSON<{ genres: Genre[] }>(`${BASE}/genre/${type}/list`);
}

/** Discover movies with optional filter parameters. */
export function discoverMovies(filters: Record<string, string> = {}): Promise<TMDBPage> {
  const params = new URLSearchParams({ include_adult: 'false', ...filters });
  return fetchJSON<TMDBPage>(`${BASE}/discover/movie?${params}`);
}

/** Discover TV shows with optional filter parameters. */
export function discoverTV(filters: Record<string, string> = {}): Promise<TMDBPage> {
  const params = new URLSearchParams({ include_adult: 'false', ...filters });
  return fetchJSON<TMDBPage>(`${BASE}/discover/tv?${params}`);
}
