import { Typography } from '@material-tailwind/react';
import { StickyNavbar } from './../components/StickyNavbar';

function NavLinks() {
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <li>
        <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
          <a href="/reviews" className="flex items-center">
            Reviews
          </a>
        </Typography>
      </li>
      <li>
        <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
          <a href="/wishlist" className="flex items-center">
            Wishlist
          </a>
        </Typography>
      </li>
    </ul>
  );
}

export default function Home() {
  return (
    <div>
      <section className="p-3 h-fit max-w-[1920px]">
        <StickyNavbar navList={NavLinks} />
      </section>
    </div>
  );
}
