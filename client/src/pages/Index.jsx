import ImageCarousel from '../components/Carousel';
import { StickyNavbar } from '../components/StickyNavbar';
import React from 'react';
import { Footer } from '../components/Footer';
import { Card, CardBody, CardFooter } from '@material-tailwind/react';
import { Search, Bookmark, TrendingUp } from 'lucide-react';
import FeatureCard from '../components/Card';
import SearchBtn from '../components/SearchBtn';

function Index() {
  return (
    <div className="w-full">
      <section className="h-fit w-full mx-auto">
        <StickyNavbar />
      </section>

      <section className="mt-24 flex flex-col md:flex-row items-center justify-center w-full max-w-7xl mx-auto px-6 gap-16">
        <ImageCarousel className="w-full md:w-1/2" />

        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl max-w-xl">
            Discover, Bookmark, and Explore Your Favorite Movies
          </h1>
          <p className="text-gray-600 mt-4 mb-6 max-w-md">
            Seamlessly search through thousands of movies, create personal watchlists, and get
            personalized recommendations.
          </p>
          <SearchBtn />
        </div>
      </section>

      <section className="max-w-7xl mx-auto my-20 p-10 text-center">
        <h2 className="text-gray-500 uppercase font-semibold">Our Features</h2>
        <h1 className="text-3xl md:text-4xl font-bold my-2">Powerful Movie Discovery Tools</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm">
          Explore movies like never before with advanced search, personalized recommendations, and
          smart bookmarking.
        </p>

        <div className="mt-10 flex flex-col md:flex-row gap-6">
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

        <div className="mt-6 flex justify-center">
          <FeatureCard
            icon={<TrendingUp className="w-8 h-8 text-purple-500" />}
            category="Recommendations"
            title="Smart Movie Suggestions"
            description="Get personalized movie recommendations based on your viewing history and preferences."
          />
        </div>
      </section>

      <section>
        <div className="max-w-5xl mx-auto mt-10 gap-8">
          <div className="flex flex-col md:flex-row gap-4">
            <Card className="mt-6 w-full md:w-[40%]">
              <CardBody></CardBody>
              <CardFooter className="pt-0"></CardFooter>
            </Card>
            <Card className="mt-6 w-full md:w-[60%]">
              <CardBody></CardBody>
              <CardFooter className="pt-0"></CardFooter>
            </Card>
          </div>
          <div className="flex flex-col-reverse md:flex-row gap-4">
            <Card className="mt-6 w-full md:w-[60%]">
              <CardBody></CardBody>
              <CardFooter className="pt-0"></CardFooter>
            </Card>
            <Card className="mt-6 w-full md:w-[40%]">
              <CardBody></CardBody>
              <CardFooter className="pt-0"></CardFooter>
            </Card>
          </div>
          <div className="flex flex-col-reverse md:flex-row gap-4">
            <Card className="mt-6 w-full md:w-[30%]">
              <CardBody></CardBody>
              <CardFooter className="pt-0"></CardFooter>
            </Card>
            <Card className="mt-6 w-full md:w-[70%]">
              <CardBody></CardBody>
              <CardFooter className="pt-0"></CardFooter>
            </Card>
          </div>
          <div className="flex flex-col-reverse md:flex-row gap-4">
            <Card className="mt-6 w-full md:w-[20%]">
              <CardBody></CardBody>
              <CardFooter className="pt-0"></CardFooter>
            </Card>
            <Card className="mt-6 w-full md:w-[50%]">
              <CardBody></CardBody>
              <CardFooter className="pt-0"></CardFooter>
            </Card>
            <Card className="mt-6 w-full md:w-[30%]">
              <CardBody></CardBody>
              <CardFooter className="pt-0"></CardFooter>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Index;
