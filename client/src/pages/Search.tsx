/** Search page with debounced input, trending section, and recent search history. */
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { searchMulti, getTrending, type TMDBItem } from '../libs/tmdb';
import { StickyNavbar } from '../components/StickyNavbar';
import { Footer } from '../components/Footer';
import { Search as SearchIcon, Star, TrendingUp, X } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';

/** Retrieve recent search queries from localStorage. */
function getSearchHistory(): string[] {
  try {
    return JSON.parse(localStorage.getItem('search_history') || '[]');
  } catch {
    return [];
  }
}

/** Append a query to search history, keeping max 10 entries. */
function addToHistory(query: string): void {
  if (!query?.trim()) return;
  const history = getSearchHistory();
  const updated = [query, ...history.filter((h) => h !== query)].slice(0, 10);
  localStorage.setItem('search_history', JSON.stringify(updated));
}

/** Clear all search history from localStorage. */
function clearHistory(): void {
  localStorage.removeItem('search_history');
}

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [input, setInput] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showHistory, setShowHistory] = useState(false);
  const history = getSearchHistory();
  const debouncedQuery = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (debouncedQuery.current) clearTimeout(debouncedQuery.current);
    debouncedQuery.current = setTimeout(() => {
      if (input.trim()) {
        setSearchParams({ q: input.trim() });
        addToHistory(input.trim());
      } else {
        setSearchParams({});
      }
    }, 400);
    return () => clearTimeout(debouncedQuery.current);
  }, [input, setSearchParams]);

  const { data, isLoading } = useQuery({
    queryKey: ['search', query],
    queryFn: () => searchMulti(query),
    enabled: !!query,
    staleTime: 1000 * 60 * 5
  });

  const { data: trending } = useQuery({
    queryKey: ['trending', 'all', 'week'],
    queryFn: () => getTrending('all', 'week'),
    staleTime: 1000 * 60 * 30
  });

  const results: TMDBItem[] =
    data?.results?.filter((item: TMDBItem) => item.media_type !== 'person') || [];
  const trendingResults: TMDBItem[] =
    trending?.results?.filter((item: TMDBItem) => item.media_type !== 'person') || [];

  const handleSelect = useCallback(
    (item: TMDBItem) => {
      const path = item.media_type === 'tv' ? `/movie/${item.id}?type=tv` : `/movie/${item.id}`;
      navigate(path);
    },
    [navigate]
  );

  return (
    <div className="min-h-screen bg-white">
      <StickyNavbar />

      <div className="pt-24 pb-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setShowHistory(true)}
              onBlur={() => setTimeout(() => setShowHistory(false), 200)}
              placeholder="Search movies, TV shows..."
              className="w-full pl-12 pr-10 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {input && (
              <button
                onClick={() => {
                  setInput('');
                  setSearchParams({});
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}

            {showHistory && !input && history.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-20 p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-500">Recent Searches</h3>
                  <button
                    onClick={clearHistory}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    Clear
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {history.map((h: string, i: number) => (
                    <button
                      key={i}
                      onMouseDown={() => {
                        setInput(h);
                        setShowHistory(false);
                      }}
                      className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[2/3] bg-gray-200 rounded-lg" />
                <div className="h-4 bg-gray-200 rounded mt-2 w-3/4" />
                <div className="h-3 bg-gray-200 rounded mt-1 w-1/2" />
              </div>
            ))}
          </div>
        )}

        {query && !isLoading && results.length === 0 && (
          <div className="text-center py-16">
            <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600">
              No results found for &ldquo;{query}&rdquo;
            </h2>
            <p className="text-gray-400 mt-2">Try adjusting your search terms</p>
          </div>
        )}

        {query && !isLoading && results.length > 0 && (
          <>
            <p className="text-sm text-gray-500 mb-6">
              {data?.total_results} results for &ldquo;{query}&rdquo;
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {results.slice(0, 20).map((item) => (
                <div
                  key={`${item.media_type}-${item.id}`}
                  onClick={() => handleSelect(item)}
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
                    {item.media_type && (
                      <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded uppercase font-semibold">
                        {item.media_type === 'tv' ? 'TV' : 'Movie'}
                      </div>
                    )}
                  </div>
                  <div className="p-2.5">
                    <p className="text-sm font-semibold truncate">{item.title || item.name}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-500">
                        {item.release_date?.split('-')[0] ||
                          item.first_air_date?.split('-')[0] ||
                          '—'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {!query && !isLoading && trendingResults.length > 0 && (
          <>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6 text-red-500" />
              <h2 className="text-2xl font-bold">Trending This Week</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {trendingResults.slice(0, 15).map((item) => (
                <div
                  key={`${item.media_type}-${item.id}`}
                  onClick={() => handleSelect(item)}
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
                    {item.media_type && (
                      <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded uppercase font-semibold">
                        {item.media_type === 'tv' ? 'TV' : 'Movie'}
                      </div>
                    )}
                  </div>
                  <div className="p-2.5">
                    <p className="text-sm font-semibold truncate">{item.title || item.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.release_date?.split('-')[0] ||
                        item.first_air_date?.split('-')[0] ||
                        '—'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
