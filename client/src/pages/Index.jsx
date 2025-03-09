import { Button } from '@material-tailwind/react';
import ImageCarousel from '../components/Carousel';
import { StickyNavbar } from '../components/StickyNavbar';
import React from 'react';
import { Footer } from '../components/Footer';
import { Card, CardBody, CardFooter } from '@material-tailwind/react';
import { MousePointerClick } from 'lucide-react';
import FeatureCard from '../components/Card';

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
            For movie lovers, by movie critics.
          </h1>
          <Button variant="outlined" className="my-6">
            Explore
          </Button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto my-20 p-10 text-center">
          <h2 className="text-gray-500 uppercase font-semibold">Our Work</h2>
          <h1 className="text-3xl md:text-4xl font-bold my-2">Some of Our Awesome Projects</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm">
            If you can&apos;t decide, the answer is no. If two equally difficult paths exist, choose the
            one more painful in the short term.
          </p>

          {/* Cards Layout */}
          <div className="mt-10 flex flex-col md:flex-row gap-6">
            <FeatureCard
              category="Productivity"
              title="Search and Discover!"
              description="Insight to help you create, connect, and convert. Understand Your Audience's Interests and Intent."
            />
            <FeatureCard
              category="Design"
              title="Find Music and Play!"
              description="Discover emerging topics and trends. Understand Your Audience’s Interests and Interactions."
            />
          </div>

          {/* Large Card Below */}
          <div className="mt-6 flex justify-center">
            <FeatureCard
              category="Design"
              title="Find Music and Play!"
              description="Insight to help you create, connect, and convert. Understand Your Audience's Interests and Interactions."
            />
          </div>
      </section>

      <section className="max-w-7xl mx-auto my-20 p-10">
        <div className="text-center flex flex-col items-center">
          <MousePointerClick className="w-16 h-16 p-4 bg-black text-white rounded-lg mb-4" />
          <h2 className="text-4xl font-bold">How To Handle Components</h2>
          <p className="text-lg text-gray-500 max-w-2xl mt-2">
            We&apos;re constantly trying to express ourselves and actualize our dreams. Don&apos;t
            stop.
          </p>
        </div>

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
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Index;
