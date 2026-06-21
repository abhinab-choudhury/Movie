import ImageCarousel from '../components/Carousel';
import { StickyNavbar } from '../components/StickyNavbar';
import { Footer } from '../components/Footer';
import FeatureCard from '../components/Card';
import SearchBtn from '../components/SearchBtn';
import { useNavigate } from 'react-router-dom';
import { Search, Bookmark, TrendingUp } from 'lucide-react';

function Index() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white text-gray-800">
      <StickyNavbar />

      <main className="pt-20">
        <section className="flex flex-col-reverse md:flex-row items-center justify-center w-full max-w-7xl mx-auto px-6 gap-12 md:gap-20 min-h-[70vh]">
          <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left flex-1">
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight max-w-xl leading-tight">
              Discover, Bookmark, and Explore Your Favorite Movies
            </h1>
            <p className="text-gray-600 mt-4 mb-6 max-w-md text-lg">
              Seamlessly search through thousands of movies, create personal watchlists, and get
              personalized recommendations.
            </p>
            <SearchBtn />
          </div>
          <div className="w-full md:w-1/2 flex-shrink-0">
            <ImageCarousel />
          </div>
        </section>

        <section className="max-w-7xl mx-auto my-24 px-6 text-center">
          <p className="text-gray-500 uppercase font-semibold tracking-wide text-sm">Our Features</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-gray-900">Powerful Movie Discovery Tools</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm mb-12">
            Explore movies like never before with advanced search, personalized recommendations, and
            smart bookmarking.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 max-w-5xl mx-auto">
            <FeatureCard
              icon={<Search className="w-8 h-8 text-blue-500" />}
              category="Search"
              title="Advanced Movie Search"
              description="Find movies by genre, year, rating, and more with our intelligent search engine."
              buttonText="Search Now"
              onButtonClick={() => navigate('/search')}
            />
            <FeatureCard
              icon={<Bookmark className="w-8 h-8 text-green-500" />}
              category="Bookmarks"
              title="Personal Watchlist"
              description="Save and organize your favorite movies. Never lose track of what you want to watch."
              buttonText="View Wishlist"
              onButtonClick={() => navigate('/wishlist')}
            />
          </div>

          <div className="flex justify-center max-w-5xl mx-auto">
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8 text-purple-500" />}
              category="Recommendations"
              title="Smart Movie Suggestions"
              description="Get personalized movie recommendations based on your viewing history and preferences."
              buttonText="Explore"
              onButtonClick={() => navigate('/search')}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Index;
