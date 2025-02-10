import { Typography } from '@material-tailwind/react';
import logo from './../assets/favicon.png';
import linkedin_logo from './../assets/linkedin.png';
import github_logo from './../assets/github.png';
import instagram_logo from './../assets/instagram.png';
import xtwitter_logo from './../assets/twitter.png';

export function Footer() {
  return (
    <footer className="w-full bg-white p-8">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
        <div className="flex gap-4 align-middle">
          <img src={logo} alt="logo-ct" className="w-10" />
          <h1 className="text-2xl font-extrabold">Movie</h1>
        </div>
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              About Us
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              License
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contact Us
            </Typography>
          </li>
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <Typography color="blue-gray" className="text-center font-normal">
        &copy; {new Date().getFullYear()} Movie. All Rights Reserved.
      </Typography>
      <div className="grid place-content-center my-10">
        <div className="flex gap-4">
          <a href="https://www.instagram.com/abhinab_choudhury_/">
            <img width={48} src={instagram_logo} alt="instagram" />
          </a>
          <a href="https://www.linkedin.com/in/abhinab-choudhury-18022822b/">
            <img width={48} src={linkedin_logo} alt="facebook" />
          </a>
          <a href="https://github.com/abhinab-choudhury">
            <img width={48} src={github_logo} alt="github_logo" />
          </a>
          <a href="https://x.com/abhinabc_">
            <img width={48} src={xtwitter_logo} alt="xtwitter" />
          </a>
        </div>
      </div>
    </footer>
  );
}
