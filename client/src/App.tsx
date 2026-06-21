import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { CircularProgress, Box } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5
    }
  }
});

const Index = lazy(() => import('./pages/Index'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Search = lazy(() => import('./pages/Search'));
const MovieDetail = lazy(() => import('./pages/MovieDetail'));
const Error404 = lazy(() => import('./pages/PageNotFound'));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense
          fallback={
            <Box
              sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <CircularProgress />
            </Box>
          }
        >
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
