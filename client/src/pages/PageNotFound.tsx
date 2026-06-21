/** 404 error page with a link back to the home page. */
import { Typography, Button } from '@material-tailwind/react';
import { FlagIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Error404() {
  return (
    <div className="h-screen mx-auto grid place-items-center text-center px-8">
      <div>
        <FlagIcon className="w-20 h-20 mx-auto" />
        <Typography
          variant="h1"
          color="blue-gray"
          className="mt-10 !text-3xl !leading-snug md:!text-4xl"
        >
          Error 404 <br /> It looks like something went wrong.
        </Typography>
        <Typography className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
          Don&apos;t worry, our team is already on it.Please try refreshing the page or come back
          later.
        </Typography>
        <Button color="gray" className="w-full px-4 md:w-[8rem]">
          <Link to={'/'}>back home</Link>
        </Button>
      </div>
    </div>
  );
}

export default Error404;
