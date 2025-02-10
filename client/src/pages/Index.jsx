import { Button } from '@material-tailwind/react';
import ImageCarousel from '../components/Carousel';
import { StickyNavbar } from '../components/StickyNavbar';
import hero1 from './../assets/hero-1.svg';
import React from 'react';
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import { Footer } from '../components/Footer';
// import SimpleGrow from '../components/MUIGrow';

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
      <section className="mt-20 flex flex-col md:flex-row align-middle justify-center items-center w-full max-w-[100%] gap-8 px-6 my-20">
        <ImageCarousel />

        <div className="flex flex-col justify-center items-center text-center md:items-start md:text-left">
          <h1 className="md:pr-10 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center md:text-left">
            For movie lovers, by movie critics.
          </h1>
          <Button variant="outlined" className='my-4'>Explore</Button>
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
