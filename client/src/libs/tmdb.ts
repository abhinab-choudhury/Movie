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

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
  return res.json();
}

export function searchMulti(query: string, page = 1): Promise<TMDBPage> {
  return fetchJSON<TMDBPage>(`${BASE}/search/multi?query=${encodeURIComponent(query)}&page=${page}&include_adult=false`);
}

export function getMovie(id: number | string): Promise<MovieDetail> {
  return fetchJSON<MovieDetail>(`${BASE}/movie/${id}?append_to_response=credits,videos`);
}

export function getTV(id: number | string): Promise<MovieDetail> {
  return fetchJSON<MovieDetail>(`${BASE}/tv/${id}?append_to_response=credits,videos`);
}

export function getRecommendations(id: number | string): Promise<TMDBPage> {
  return fetchJSON<TMDBPage>(`${BASE}/movie/${id}/recommendations`);
}

export function getSimilar(id: number | string): Promise<TMDBPage> {
  return fetchJSON<TMDBPage>(`${BASE}/movie/${id}/similar`);
}

export function getTrending(type = 'all', time = 'week'): Promise<TMDBPage> {
  return fetchJSON<TMDBPage>(`${BASE}/trending/${type}/${time}?include_adult=false`);
}

export function getGenreList(type = 'movie'): Promise<{ genres: Genre[] }> {
  return fetchJSON<{ genres: Genre[] }>(`${BASE}/genre/${type}/list`);
}

export function discoverMovies(filters: Record<string, string> = {}): Promise<TMDBPage> {
  const params = new URLSearchParams({ include_adult: 'false', ...filters });
  return fetchJSON<TMDBPage>(`${BASE}/discover/movie?${params}`);
}

export function discoverTV(filters: Record<string, string> = {}): Promise<TMDBPage> {
  const params = new URLSearchParams({ include_adult: 'false', ...filters });
  return fetchJSON<TMDBPage>(`${BASE}/discover/tv?${params}`);
}
