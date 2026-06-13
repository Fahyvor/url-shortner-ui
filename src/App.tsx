import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import URLShortner from './pages/URLShortner';
import Navbar from './components/Navbar';
import VideoDownloader from './pages/VideoDownloader';
import Footer from './components/Footer';
import RedirectHandler from './pages/RedirectHandler';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import AuthSuccess from './pages/Success';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
          <Navbar />

          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/video-downloader" element={<VideoDownloader />} />
                <Route path="/url-shortner" element={<URLShortner />} />
                <Route path='/dashboard' element={<Dashboard />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/success" element={<AuthSuccess />} />
              <Route path="/:id" element={<RedirectHandler />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;