import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import Wishlist from './pages/Wishlist';
import Reviews from './pages/Reviews';
import Search from './pages/Search';
import SignInPage from './pages/Signin';
import SignUpPage from './pages/Signup';
import Home from './pages/Home';
import Error404 from './pages/pageNotFound';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
