import React from 'react';
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import VideoDownloader from './pages/VideoDownloader';
import Footer from './components/Footer';
import RedirectHandler from './pages/RedirectHandler';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
        {/* Navigation */}
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/video-downloader" element={<VideoDownloader />} />
            <Route path="/*" element={<RedirectHandler />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Mature Footer */}
        {/* <footer className="py-12 bg-white border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col items-center w-full">
              <span className="text-[10px] text-center text-elrey-primary tracking-widest uppercase">&copy; {new Date().getFullYear()} Elrey Technologies</span>
            </div>
          </div>
        </footer> */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;