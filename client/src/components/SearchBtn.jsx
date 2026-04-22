import { CommandIcon, Search } from 'lucide-react';
import {
  Button,
  Card,
  CardBody,
  Dialog,
  DialogBody,
  DialogFooter,
  Input,
  Typography
} from '@material-tailwind/react';
import { useCallback, useEffect, useState } from 'react';

export default function SearchBtn() {
  // add debouncing in search
  // redirect the user to the /search/:imdb_id page to show the details of the show
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(true);

  const handleOpen = () => setOpen(!open);

  const searchFunction = useCallback((event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      setOpen(true);
      setSearchQuery('');
    }

    if (event.key === 'Escape') {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', searchFunction, false);
    return () => {
      document.removeEventListener('keydown', searchFunction, false);
    };
  }, [searchFunction]);

  return (
    <div>
      <Button onClick={handleOpen} className="flex items-center gap-2">
        <Search className="w-5 h-5" />
        <span>Start Searching</span>
        <div className="ml-auto flex items-center gap-1 text-muted-foreground">
          <CommandIcon className="w-4 h-4" />
          <span className="text-sm">K</span>
        </div>
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogBody>
          <form>
            <label className="block mb-2 text-sm text-slate-600">
              Search you desired movie/series
            </label>
            <Input
              onChange={(event) => {
                setSearchQuery(event.target.value);
              }}
              value={searchQuery}
              pattern="Oppenheimer"
              className="appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              labelProps={{
                className: 'before:content-none after:content-none'
              }}
            />
          </form>
        </DialogBody>
        <hr className="my-3" />
        <DialogFooter>
          {isSearching ? (
            <span>Loading...</span>
          ) : (
            <Card className="border w-full border-gray-300 shadow-sm">
              <CardBody className="p-4">
                <Typography color="blue-gray" className="!text-base !font-semibold">
                  Opennheimer
                </Typography>
                <Typography variant="small">Director: Christopher Nolan</Typography>
              </CardBody>
            </Card>
          )}
        </DialogFooter>
      </Dialog>
    </div>
  );
}
