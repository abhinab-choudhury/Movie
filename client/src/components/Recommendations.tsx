import { useQuery } from '@tanstack/react-query';
import { getRecommendations, getSimilar, type TMDBItem } from '../libs/tmdb';
import { Heart, Star, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface CachedData {
  results: TMDBItem[];
}

function getCached<T>(key: string): T | null {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null') as T;
  } catch {
    return null;
  }
}

function setCache<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch { /* noop */ }
}

const CACHE_PREFIX = 'rec_cache_';

interface RecommendationsProps {
  movieId: string;
  title?: string;
}

export default function Recommendations({ movieId, title = 'You Might Also Like' }: RecommendationsProps) {
  const navigate = useNavigate();
  const cacheKey = `${CACHE_PREFIX}${movieId}`;
  const cached = getCached<CachedData>(cacheKey);
  const [items, setItems] = useState<TMDBItem[]>(cached ? cached.results : []);

  const { data } = useQuery({
    queryKey: ['recommendations', movieId],
    queryFn: async () => {
      const [recs, sim] = await Promise.all([
        getRecommendations(movieId),
        getSimilar(movieId)
      ]);
      return { recs, sim };
    },
    enabled: !!movieId,
    staleTime: 1000 * 60 * 60,
    placeholderData: cached ? { recs: { results: cached.results, page: 1, total_pages: 1, total_results: cached.results.length }, sim: { results: [], page: 1, total_pages: 1, total_results: 0 } } : undefined
  });

  useEffect(() => {
    if (data) {
      const all = [...(data.recs?.results || []), ...(data.sim?.results || [])];
      const unique = Array.from(new Map(all.map(m => [m.id, m])).values()).slice(0, 12);
      setItems(unique);
      setCache<CachedData>(cacheKey, { results: unique });
      const history = getCached<number[]>('rec_history') || [];
      if (!history.includes(Number(movieId))) {
        setCache('rec_history', [Number(movieId), ...history].slice(0, 20));
      }
    }
  }, [data, movieId, cacheKey]);

  if (!items.length) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 rounded-lg aspect-[2/3]" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <button
          onClick={() => navigate(`/search?q=${encodeURIComponent(title)}`)}
          className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          View All <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(item.media_type === 'tv' ? `/movie/${item.id}?type=tv` : `/movie/${item.id}`)}
            className="group cursor-pointer rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white"
          >
            <div className="relative aspect-[2/3] bg-gray-200">
              {item.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                  alt={item.title || item.name || ''}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm p-2 text-center">
                  No Image
                </div>
              )}
              <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                {(item.vote_average || 0).toFixed(1)}
              </div>
            </div>
            <div className="p-2">
              <p className="text-sm font-semibold truncate">{item.title || item.name}</p>
              <p className="text-xs text-gray-500">
                {item.release_date?.split('-')[0] || item.first_air_date?.split('-')[0] || ''}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
