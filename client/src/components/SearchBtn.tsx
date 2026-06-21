/** Quick-search dialog triggered by button or Cmd/Ctrl+K shortcut. */
import { CommandIcon, Search, Star } from 'lucide-react';
import {
  Button,
  Card,
  CardBody,
  Dialog,
  DialogBody,
  DialogHeader,
  Typography
} from '@material-tailwind/react';
import { useCallback, useEffect, useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchMulti, type TMDBItem } from '../libs/tmdb';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../contexts/SearchContext';

export default function SearchBtn({ hideButton = false }: { hideButton?: boolean }) {
  const { open, setOpen } = useSearch();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpen = () => {
    setOpen(!open);
    if (!open) {
      setSearchQuery('');
      setDebouncedQuery('');
    }
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  /** Debounce search input by 400ms before firing the API call. */
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  /** Global keyboard listener for Cmd/Ctrl+K and Escape. */
  const searchFunction = useCallback((event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      setOpen(true);
      setSearchQuery('');
      setDebouncedQuery('');
    }
    if (event.key === 'Escape') {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', searchFunction, false);
    return () => {
      document.removeEventListener('keydown', searchFunction, false);
    };
  }, [searchFunction]);

  const { data, isLoading } = useQuery({
    queryKey: ['search-quick', debouncedQuery],
    queryFn: () => searchMulti(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
    staleTime: 1000 * 60 * 5
  });

  const results: TMDBItem[] =
    data?.results?.filter((item: TMDBItem) => item.media_type !== 'person') || [];

  const handleSelect = (item: TMDBItem) => {
    setOpen(false);
    const path = item.media_type === 'tv' ? `/movie/${item.id}?type=tv` : `/movie/${item.id}`;
    navigate(path);
  };

  return (
    <div>
      {!hideButton && (
        <Button
          onClick={handleOpen}
          className="flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow"
        >
          <Search className="w-5 h-5" />
          <span>Start Searching</span>
          <div className="ml-auto flex items-center gap-1 text-blue-200">
            <CommandIcon className="w-4 h-4" />
            <span className="text-sm">K</span>
          </div>
        </Button>
      )}
      <Dialog open={open} handler={handleOpen} size="lg">
        <DialogHeader className="pb-0">
          <div className="w-full">
            <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
              <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
                placeholder="Search movies and TV shows..."
                className="w-full text-lg outline-none bg-transparent placeholder:text-gray-400"
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs text-gray-400 bg-gray-100 rounded">
                <CommandIcon className="w-3 h-3" />K
              </kbd>
            </div>
          </div>
        </DialogHeader>
        <DialogBody className="max-h-96 overflow-y-auto">
          {!searchQuery && (
            <p className="text-center text-gray-400 py-8">
              Start typing to search movies and TV shows...
            </p>
          )}

          {searchQuery && searchQuery.length < 2 && (
            <p className="text-center text-gray-400 py-8">Type at least 2 characters to search</p>
          )}

          {isLoading && (
            <div className="space-y-3 py-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-3 animate-pulse">
                  <div className="w-12 h-16 bg-gray-200 rounded flex-shrink-0" />
                  <div className="flex-1 py-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2 mt-2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <div className="space-y-1 py-2">
              {results.slice(0, 8).map((item: TMDBItem) => (
                <div
                  key={`${item.media_type}-${item.id}`}
                  onClick={() => handleSelect(item)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="w-12 h-16 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                    {item.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                        alt={item.title || item.name || ''}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-300 text-xs">
                        No Img
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Typography className="text-sm font-semibold truncate">
                      {item.title || item.name}
                    </Typography>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-500">
                        {item.release_date?.split('-')[0] ||
                          item.first_air_date?.split('-')[0] ||
                          '—'}
                      </span>
                      <span className="flex items-center gap-0.5 text-xs text-gray-500">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {(item.vote_average || 0).toFixed(1)}
                      </span>
                      <span className="text-[10px] uppercase font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                        {item.media_type === 'tv' ? 'TV' : 'Movie'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-2 text-center">
                <button
                  onClick={() => {
                    setOpen(false);
                    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  View all results &rarr;
                </button>
              </div>
            </div>
          )}

          {!isLoading && searchQuery.length >= 2 && results.length === 0 && (
            <p className="text-center text-gray-400 py-8">
              No results found for &ldquo;{searchQuery}&rdquo;
            </p>
          )}
        </DialogBody>
      </Dialog>
    </div>
  );
}
