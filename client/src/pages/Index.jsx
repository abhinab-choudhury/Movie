import ImageCarousel from '../components/Carousel';
import { StickyNavbar } from '../components/StickyNavbar';
import { Footer } from '../components/Footer';
import FeatureCard from '../components/Card';
import SearchBtn from '../components/SearchBtn';
import { Search, Bookmark, TrendingUp } from 'lucide-react';

function Index() {
  return (
    <div className="w-full bg-white text-gray-800">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full shadow-sm bg-white">
        <StickyNavbar />
      </header>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-center w-full max-w-7xl mx-auto px-6 mt-16 gap-16">
        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight max-w-xl">
            Discover, Bookmark, and Explore Your Favorite Movies
          </h1>
          <p className="text-gray-600 mt-4 mb-6 max-w-md">
            Seamlessly search through thousands of movies, create personal watchlists, and get
            personalized recommendations.
          </p>
          <SearchBtn />
        </div>
        <div className="w-full md:w-1/2">
          <ImageCarousel />
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto my-20 px-6 text-center">
        <h2 className="text-gray-500 uppercase font-semibold tracking-wide">Our Features</h2>
        <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Powerful Movie Discovery Tools</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm mb-10">
          Explore movies like never before with advanced search, personalized recommendations, and
          smart bookmarking.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <FeatureCard
            icon={<Search className="w-8 h-8 text-blue-500" />}
            category="Search"
            title="Advanced Movie Search"
            description="Find movies by genre, year, rating, and more with our intelligent search engine."
          />
          <FeatureCard
            icon={<Bookmark className="w-8 h-8 text-green-500" />}
            category="Bookmarks"
            title="Personal Watchlist"
            description="Save and organize your favorite movies. Never lose track of what you want to watch."
          />
        </div>

        <div className="flex justify-center">
          <FeatureCard
            icon={<TrendingUp className="w-8 h-8 text-purple-500" />}
            category="Recommendations"
            title="Smart Movie Suggestions"
            description="Get personalized movie recommendations based on your viewing history and preferences."
          />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Index;
