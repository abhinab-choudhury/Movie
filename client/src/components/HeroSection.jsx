import hero3 from './../assets/hero-3.jpg';
import hero4 from './../assets/hero-4.jpg';
import { Carousel } from '@material-tailwind/react';

export default function HeroSection() {
  return (
    <Carousel
      className="rounded-xl mt-10 md:mt-0"
      autoplay="true"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill('').map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? 'w-8 bg-white' : 'w-4 bg-white/50'
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      <div className="flex lg:gap-10 md:gap-5 justify-center m-5 md:my-10">
        <img
          src={hero3}
          alt="image 1"
          className="rounded-2xl object-fill aspect-[16/9] lg:w-[90%]"
        />
      </div>
      <div className="flex lg:gap-10 md:gap-5 justify-center m-5 md:my-10">
        <img
          src={hero4}
          alt="image 2"
          className="rounded-2xl object-fill aspect-[16/9] lg:w-[90%]"
        />
      </div>
    </Carousel>
  );
}
