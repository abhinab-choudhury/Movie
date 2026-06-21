import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { StickyNavbar } from '../components/StickyNavbar';
import { Footer } from '../components/Footer';
import { Heart, Star, Trash2, Bookmark, ArrowLeft } from 'lucide-react';
import type { WishlistItem } from '../libs/tmdb';

function getWishlist(): WishlistItem[] {
  try {
    return JSON.parse(localStorage.getItem('movie_wishlist') || '[]');
  } catch {
    return [];
  }
}

export default function Wishlist() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setItems(getWishlist());
  }, []);

  const removeItem = useCallback((id: number) => {
    const updated = items.filter(item => item.id !== id);
    setItems(updated);
    localStorage.setItem('movie_wishlist', JSON.stringify(updated));
  }, [items]);

  const clearAll = () => {
    setItems([]);
    localStorage.removeItem('movie_wishlist');
  };

  return (
    <div className="min-h-screen bg-white">
      <StickyNavbar />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <Bookmark className="w-8 h-8 text-blue-600" />
                <h1 className="text-3xl font-extrabold text-gray-900">My Wishlist</h1>
              </div>
              <p className="text-gray-500 ml-11">
                {items.length} {items.length === 1 ? 'movie' : 'movies'} saved
              </p>
            </div>
            <div className="flex gap-3">
              {items.length > 0 && (
                <button
                  onClick={clearAll}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 border border-red-200 rounded-full hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> Clear All
                </button>
              )}
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            </div>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-24">
              <Heart className="w-20 h-20 text-gray-200 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-600 mb-2">Your wishlist is empty</h2>
              <p className="text-gray-400 mb-8">Start adding movies you want to watch!</p>
              <button
                onClick={() => navigate('/search')}
                className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
              >
                Browse Movies
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {items.map(item => (
                <div
                  key={item.id}
                  className="group relative rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white"
                >
                  <div
                    onClick={() => navigate(item.media_type === 'tv' ? `/movie/${item.id}?type=tv` : `/movie/${item.id}`)}
                    className="cursor-pointer"
                  >
                    <div className="relative aspect-[2/3] bg-gray-200">
                      {item.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                          alt={item.title}
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
                    <div className="p-2.5">
                      <p className="text-sm font-semibold truncate">{item.title}</p>
                      <p className="text-xs text-gray-500">
                        {item.release_date?.split('-')[0] || '—'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e: React.MouseEvent) => { e.stopPropagation(); removeItem(item.id); }}
                    className="absolute top-2 left-2 z-10 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
