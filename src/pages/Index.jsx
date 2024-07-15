import HeroSection from '../components/HeroSection';
import { StickyNavbar } from '../components/StickyNavbar';

function Index() {
  return (
    <div>
      <section className="my-4 p-3 w-full">
        <StickyNavbar />
      </section>
      <section className="m-5">
        <HeroSection />
      </section>
    </div>
  );
}

export default Index;
