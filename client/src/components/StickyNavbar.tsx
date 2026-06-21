/** Sticky navigation bar with scroll-aware styling and mobile menu. */
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Navbar, Typography } from '@material-tailwind/react';
import favicon from './../assets/favicon.png';
import { Search, Heart, Menu, X } from 'lucide-react';

interface NavLink {
  to: string;
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface StickyNavbarProps {
  navList?: React.ReactNode;
}

export function StickyNavbar({ navList }: StickyNavbarProps) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: NavLink[] = [
    { to: '/search', label: 'Search', icon: Search },
    { to: '/wishlist', label: 'Wishlist', icon: Heart }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300">
      <Navbar
        className={`max-w-7xl w-full mx-auto px-4 lg:px-6 transition-all duration-300 ${
          scrolled
            ? 'shadow-lg bg-white/95 backdrop-blur-sm'
            : 'shadow-none bg-white/60 backdrop-blur-md border-b border-white/10'
        }`}
      >
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography as="a" href="/" className="flex items-center gap-3 py-1.5 cursor-pointer">
            <img src={favicon} alt="Movie App Logo" className="h-10 w-10 object-contain" />
            <span className="text-2xl font-extrabold tracking-tight text-gray-900">Movie</span>
          </Typography>

          <nav className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
              {navList}
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>
        </div>

        <div
          className={`lg:hidden border-t overflow-hidden transition-all duration-300 ease-in-out ${
            mobileOpen
              ? 'max-h-64 opacity-100 mt-2 pt-2 pb-3 border-gray-100'
              : 'max-h-0 opacity-0 border-transparent'
          }`}
        >
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </Navbar>
    </header>
  );
}

export default StickyNavbar;
