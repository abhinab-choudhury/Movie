import hero3 from './../assets/hero-3.jpg';
import hero4 from './../assets/hero-4.jpg';
import { Carousel, IconButton } from '@material-tailwind/react';

export default function HeroSection() {
  return (
    <Carousel
      className="rounded-xl mt-10 md:mt-0"
      prevArrow={({ handlePrev }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handlePrev}
          className="!absolute top-1/2 opacity-0 md:opacity-100 left-12 -translate-y-2/4 bg-blue-200 lg:bg-opacity-65 md:bg-opacity-65 hover:bg-blue-300 lg:opacity-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
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
          className="!absolute top-1/2 opacity-0 md:opacity-100 !right-12 -translate-y-2/4 bg-blue-200 lg:bg-opacity-65 md:bg-opacity-65 hover:bg-blue-300 lg:opacity-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </IconButton>
      )}
    >
      <div className="flex lg:gap-10 md:gap-5 justify-center m-5 md:my-10">
        <img src={hero3} alt="image 1" className="rounded-2xl object-fill aspect-[16/9] w-[80%]" />
      </div>
      <div className="flex lg:gap-10 md:gap-5 justify-center m-5 md:my-10">
        <img src={hero4} alt="image 2" className="rounded-2xl object-fill aspect-[16/9] w-[80%]" />
      </div>
    </Carousel>
  );
}
