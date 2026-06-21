import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMovie, getTV, type MovieDetail as MovieDetailType, type WishlistItem } from '../libs/tmdb';
import { StickyNavbar } from '../components/StickyNavbar';
import { Footer } from '../components/Footer';
import Recommendations from '../components/Recommendations';
import { ArrowLeft, Star, Clock, Heart, Play } from 'lucide-react';
import { useState, useEffect } from 'react';

function getWishlist(): WishlistItem[] {
  try {
    return JSON.parse(localStorage.getItem('movie_wishlist') || '[]');
  } catch {
    return [];
  }
}

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = searchParams.get('type') || 'movie';
  const [inWishlist, setInWishlist] = useState(false);

  const { data, isLoading, error } = useQuery<MovieDetailType>({
    queryKey: [type, id],
    queryFn: () => (type === 'tv' ? getTV(id!) : getMovie(id!)) as Promise<MovieDetailType>,
    enabled: !!id,
    staleTime: 1000 * 60 * 30
  });

  useEffect(() => {
    const wishlist = getWishlist();
    setInWishlist(wishlist.some(item => item.id === Number(id)));
  }, [id]);

  const toggleWishlist = () => {
    const wishlist = getWishlist();
    if (inWishlist) {
      const updated = wishlist.filter(item => item.id !== Number(id));
      localStorage.setItem('movie_wishlist', JSON.stringify(updated));
      setInWishlist(false);
    } else if (data) {
      const item: WishlistItem = {
        id: data.id,
        title: data.title || data.name || '',
        poster_path: data.poster_path,
        vote_average: data.vote_average,
        release_date: data.release_date || data.first_air_date,
        media_type: type,
        added_at: Date.now()
      };
      wishlist.push(item);
      localStorage.setItem('movie_wishlist', JSON.stringify(wishlist));
      setInWishlist(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <StickyNavbar />
        <div className="pt-24 max-w-7xl mx-auto px-6 animate-pulse">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 aspect-[2/3] bg-gray-200 rounded-xl" />
            <div className="flex-1 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
              <div className="h-20 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-white">
        <StickyNavbar />
        <div className="pt-24 text-center">
          <p className="text-gray-500">Failed to load movie details.</p>
          <button onClick={() => navigate('/')} className="text-blue-600 mt-4 underline">Go Home</button>
        </div>
      </div>
    );
  }

  const title = data.title || data.name || '';
  const year = (data.release_date || data.first_air_date || '').split('-')[0];
  const runtime = data.runtime
    ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`
    : null;
  const backdrop = data.backdrop_path
    ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
    : null;
  const poster = data.poster_path
    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
    : null;
  const trailer = data.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');

  return (
    <div className="min-h-screen bg-white">
      <StickyNavbar />

      {backdrop && (
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <img src={backdrop} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white via-white/70 to-transparent" />
        </div>
      )}

      <div className={`max-w-7xl mx-auto px-6 ${backdrop ? '-mt-40 relative z-10' : 'pt-24'}`}>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 flex-shrink-0">
            <div className="aspect-[2/3] rounded-xl overflow-hidden shadow-xl bg-gray-100">
              {poster ? (
                <img src={poster} alt={title} className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">No Poster</div>
              )}
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">{title}</h1>

            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
              {year && <span>{year}</span>}
              {runtime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {runtime}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {data.vote_average?.toFixed(1)} / 10
              </span>
              {data.genres && (
                <span className="flex flex-wrap gap-2">
                  {data.genres.map(g => (
                    <span key={g.id} className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium">
                      {g.name}
                    </span>
                  ))}
                </span>
              )}
            </div>

            <div className="flex gap-3 mt-6 flex-wrap">
              {trailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-full text-sm font-semibold hover:bg-red-700 transition-colors"
                >
                  <Play className="w-4 h-4 fill-white" /> Trailer
                </a>
              )}
              <button
                onClick={toggleWishlist}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold border transition-colors ${
                  inWishlist
                    ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
              </button>
            </div>

            {data.overview && (
              <div className="mt-8">
                <h2 className="text-lg font-bold text-gray-900 mb-2">Overview</h2>
                <p className="text-gray-700 leading-relaxed">{data.overview}</p>
              </div>
            )}

            {data.credits?.cast && data.credits.cast.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-bold text-gray-900 mb-3">Cast</h2>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {data.credits.cast.slice(0, 8).map(person => (
                    <div key={person.id} className="flex-shrink-0 text-center w-20">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 mx-auto mb-1">
                        {person.profile_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                            alt={person.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-400 text-xs">N/A</div>
                        )}
                      </div>
                      <p className="text-xs font-medium truncate">{person.name}</p>
                      <p className="text-xs text-gray-500 truncate">{person.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {id && <Recommendations movieId={id} />}
      </div>

      <Footer />
    </div>
  );
}
