import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Navbar, Collapse, Typography, Button, IconButton } from '@material-tailwind/react';
import favicon from './../assets/favicon.png';

export function StickyNavbar({ navList }) {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  return (
    <div className="relative flex flex-col justify-center items-center">
      <Navbar className="fixed top-0 z-50 h-max max-w-7xl w-full mx-auto px-4 lg:px-6 rounded-none shadow-none">
        <div className="flex items-center justify-between w-full text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mx-2 cursor-pointer py-1.5 font-bold flex items-center gap-3"
          >
            <img src={favicon} alt="favicon" className="h-8 w-8" />
            <span className="text-2xl font-bold tracking-wide text-black">Movie</span>
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              <Link to="/signup">
                <Button fullWidth variant="text" size="sm" className="hidden lg:inline-block">
                  <span>Sign Up</span>
                </Button>
              </Link>
              <Link to="/signin">
                <Button fullWidth variant="gradient" size="sm" className="hidden lg:inline-block">
                  <span>Sign In</span>
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
          <div className="flex items-center gap-x-1 mt-5">
            <Link to="/signin">
              <Button fullWidth variant="gradient" size="sm">
                <span>Sign In</span>
              </Button>
            </Link>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
}

StickyNavbar.propTypes = {
  navList: PropTypes.node
};
