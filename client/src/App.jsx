import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { CircularProgress, Box } from '@mui/material';

const Index = lazy(() => import("./pages/Index"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Reviews = lazy(() => import("./pages/Reviews"));
const Search = lazy(() => import("./pages/Search"));
const SignInPage = lazy(() => import("./pages/Signin"));
const Error404 = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <Box
            sx={{
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        }
      >
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/search/:imdb_id" element={<Search />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;