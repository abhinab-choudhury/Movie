import { Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import logo from './../assets/favicon.png';
import linkedin_logo from './../assets/linkedin.png';
import github_logo from './../assets/github.png';
import instagram_logo from './../assets/instagram.png';
import xtwitter_logo from './../assets/twitter.png';
import { Heart, Search, Bookmark } from 'lucide-react';

interface SocialLink {
  href: string;
  img: string;
  alt: string;
}

interface FooterLink {
  to: string;
  label: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface LinkSection {
  title: string;
  links: FooterLink[];
}

export function Footer() {
  const socialLinks: SocialLink[] = [
    { href: 'https://www.instagram.com/abhinab_choudhury_/', img: instagram_logo, alt: 'instagram' },
    { href: 'https://www.linkedin.com/in/abhinab-choudhury-18022822b/', img: linkedin_logo, alt: 'linkedin' },
    { href: 'https://github.com/abhinab-choudhury', img: github_logo, alt: 'github' },
    { href: 'https://x.com/abhinabc_', img: xtwitter_logo, alt: 'x/twitter' }
  ];

  const footerLinks: LinkSection[] = [
    {
      title: 'Explore',
      links: [
        { to: '/search', label: 'Search Movies', icon: Search },
        { to: '/wishlist', label: 'Wishlist', icon: Bookmark }
      ]
    },
    {
      title: 'Support',
      links: [
        { to: '#', label: 'About Us' },
        { to: '#', label: 'License' },
        { to: '#', label: 'Contact Us' }
      ]
    }
  ];

  return (
    <footer className="w-full bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="logo" className="w-10 h-10" />
              <h1 className="text-2xl font-extrabold text-gray-900">Movie</h1>
            </div>
            <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
              Discover, bookmark, and explore your favorite movies and TV shows. 
              Get personalized recommendations tailored just for you.
            </p>
          </div>

          {footerLinks.map(section => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map(link => {
                  const Icon = link.icon;
                  return (
                    <li key={link.label}>
                      {link.to.startsWith('/') ? (
                        <Link
                          to={link.to}
                          className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors"
                        >
                          {Icon && <Icon className="w-4 h-4" />}
                          {link.label}
                        </Link>
                      ) : (
                        <Typography
                          as="a"
                          href={link.to}
                          color="blue-gray"
                          className="text-sm font-normal transition-colors hover:text-blue-500"
                        >
                          {link.label}
                        </Typography>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <hr className="my-8 border-gray-200" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Typography color="blue-gray" className="text-sm font-normal text-gray-500">
            &copy; {new Date().getFullYear()} Movie. Made with{' '}
            <Heart className="w-4 h-4 inline-block text-red-500 fill-red-500" /> for movie lovers.
          </Typography>

          <div className="flex gap-3">
            {socialLinks.map(social => (
              <a
                key={social.alt}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <img width={20} height={20} src={social.img} alt={social.alt} className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
