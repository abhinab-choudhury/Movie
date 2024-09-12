import { Button } from '@material-tailwind/react';
import HeroSection from '../components/HeroSection';
import { StickyNavbar } from '../components/StickyNavbar';
import hero1 from './../assets/hero-1.svg';
import React from 'react';
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import { Footer } from '../components/Footer';

function Index() {
  const [open, setOpen] = React.useState(1);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const faqs = [
    {
      ques: 'How do I submit a review on Movie-Sovi?',
      ans: 'To submit a review, simply create an account or log in to your existing one.Then, search for the movie you\'d like to review, click on the "Write a Review" button, and share your thoughts! Our AI will check the validity of your review before it goes live to ensure high-quality content for our community.'
    },
    {
      ques: 'How does the AI-Powered review validation work ?',
      ans: 'Our AI validation system analyzes submitted reviews to detect spam, offensive language, or irrelevant content.This helps us maintain a high standard of quality and authenticity across all reviews.If your review is flagged by our AI, you’ll have the opportunity to edit and resubmit it.'
    },
    {
      ques: 'How does the voting system work ?',
      ans: 'Each review on Movie-Sovi can be upvoted or downvoted by the community.Upvotes are given to reviews that are helpful, insightful, or well - written, while downvotes are used for reviews that may lack quality or relevance.The most helpful reviews will rise to the top, helping users quickly find the best content.'
    },
    {
      ques: 'How does Movie-Sovi suggest movies based on my preferences ?',
      ans: 'Movie-Sovi uses your wishlist and your review history to understand your movie preferences.Our recommendation engine then suggests movies that match your tastes, helping you discover new favorites tailored to your interests.'
    }
  ];
  return (
    <div>
      <section className="my-4 p-3 h-fit max-w-[1920px]">
        <StickyNavbar />
      </section>
      <section className="h-fit max-w-[1920px]">
        <HeroSection />
      </section>
      <section className="h-fit max-w-[1920px] max-h-[840px] flex flex-col md:flex-row justify-start backdrop-blur-sm p-[8%]">
        <div className="flex flex-col gap-7 justify-start align-middle md:w-[50%] my-8">
          <h1 className="text-4xl font-extrabold">About Movie-Sovi</h1>
          <div className="noto-sans-regular rounded-xl text-balance md:text-lg">
            Dive into the world of cinema with Movie-Sovi, your go to destination for discovering
            and sharing movie reviews. Whether you&apos;re looking for honest opinions, hidden gems,
            or the next blockbuster to watch, Movie-Sovi is here to connect movie lovers from all
            walks of life.
          </div>
          <div className="flex justify-start">
            <Button
              fullWidth
              variant="gradient"
              size="lg"
              className="hidden lg:inline-block w-auto"
            >
              <span>Sign up to know More</span>
            </Button>
          </div>
        </div>
        <div className="md:w-[50%] mx-9">
          <img
            className="ml-auto rounded-2xl mx-10 my-5 object-cover w-[100%] md:w-[380px]"
            src={hero1}
            alt="movie-scene"
          />
        </div>
      </section>
      <div className="bg-[#e3e9ff]">
        <section className="flex flex-col h-fit max-w-[1200px] p-10 mx-auto">
          <h1 className="text-4xl font-extrabold">FAQs</h1>
          <div className="my-10">
            {faqs.map((question, idx) => (
              <Accordion key={idx} open={open === idx}>
                <AccordionHeader onClick={() => handleOpen(idx)}>{question.ques}</AccordionHeader>
                <AccordionBody className="text-balance md:text-lg">{question.ans}</AccordionBody>
              </Accordion>
            ))}
          </div>
        </section>
      </div>
      <section>
        <Footer />
      </section>
    </div>
  );
}

export default Index;
