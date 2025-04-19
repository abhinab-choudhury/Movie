import React from 'react';
import PropTypes from 'prop-types';
import SignInBtn from './SignInBtn.jsx';
import { Navbar, Typography } from '@material-tailwind/react';
import favicon from './../assets/favicon.png';

export function StickyNavbar({ navList }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <Navbar className="max-w-7xl w-full mx-auto px-4 lg:px-6 shadow-md bg-white shadow-none">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography as="a" href="/" className="flex items-center gap-3 py-1.5 cursor-pointer">
            <img src={favicon} alt="Movie App Logo" className="h-10 w-10 object-contain" />
            <span className="text-2xl font-extrabold tracking-tight text-gray-900">Movie</span>
          </Typography>

          <nav className="flex items-center space-x-4">
            <div className="hidden lg:block">{navList}</div>
            <div className="flex items-center">
              <SignInBtn />
            </div>
          </nav>
        </div>
      </Navbar>
    </header>
  );
}

StickyNavbar.propTypes = {
  navList: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
};

StickyNavbar.defaultProps = {
  navList: null
};

export default StickyNavbar;
