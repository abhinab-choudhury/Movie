import favicon from './../assets/favicon.png';
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Collapse, Typography, Button, IconButton } from '@material-tailwind/react';

export function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <li>
        <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
          <a href="#" className="flex items-center">
            Movies
          </a>
        </Typography>
      </li>
      <li>
        <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
          <a href="#" className="flex items-center">
            Wishlist
          </a>
        </Typography>
      </li>
    </ul>
  );

  return (
    <div className="relative -m-3 max-h-[768px] w-[calc(100% - 45px)] scroll-m-0">
      <Navbar className="fixed top-0 z-50 h-max max-w-full rounded-none px-4 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mx-2 cursor-pointer py-1.5 font-bold flex justify-content-center gap-3"
          >
            <img src={favicon} alt="fabicon" />
            <span className="text-2xl">Movie-sovi</span>
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              <Link to="/signin">
                <Button fullWidth variant="gradient" size="sm" className="hidden lg:inline-block">
                  <span>sign in</span>
                </Button>
              </Link>
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            <Link to="/signin">
              <Button fullWidth variant="gradient" size="sm" className="">
                <span>sign in</span>
              </Button>
            </Link>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
}
