import hero1 from './../assets/hero1.jpg';
import hero2 from './../assets/hero2.jpg';
import { Carousel } from '@material-tailwind/react';

export default function ImageCarousel() {
  return (
    <Carousel
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
          src={hero1}
          alt="image 1"
          className="rounded-2xl object-fill aspect-[16/9] lg:w-[90%]"
        />
      </div>
      <div className="flex lg:gap-10 md:gap-5 justify-center m-5 md:my-10">
        <img
          src={hero2}
          alt="image 2"
          className="rounded-2xl object-fill aspect-[16/9] lg:w-[90%]"
        />
      </div>
    </Carousel>
  );
}
