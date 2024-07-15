import hero1 from './../assets/hero-1.svg';
import hero2 from './../assets/hero-2.svg';
import { Carousel, IconButton } from '@material-tailwind/react';

export default function HeroSection() {
  return (
    <Carousel
      className="rounded-xl mt-14 lg:w-[50%] sm:w-[100%]"
      prevArrow={({ handlePrev }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handlePrev}
          className="!absolute top-1/2 left-4 -translate-y-2/4 bg-pink-200 lg:bg-opacity-65 md:bg-opacity-65 hover:bg-pink-300 lg:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handleNext}
          className="!absolute top-1/2 !right-4 -translate-y-2/4 bg-pink-200 lg:bg-opacity-65 md:bg-opacity-65 hover:bg-pink-300 lg:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </IconButton>
      )}>
      <div className="flex lg:gap-10 md:gap-5 justify-center">
        <img src={hero1} alt="image 1" className="object-cover rounded-lg" />
      </div>
      <div>
        <img src={hero2} alt="image 2" className="object-cover rounded-lg" />
      </div>
    </Carousel>
  );
}
