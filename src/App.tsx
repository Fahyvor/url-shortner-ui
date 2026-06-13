import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import AuthSuccess from "./pages/AuthSuccess";
import Dashboard from "./pages/Dashboard";
import VideoDownloader from "./pages/VideoDownloader";
import URLShortner from "./pages/URLShortner";
import RedirectHandler from "./pages/RedirectHandler";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
          <Navbar />

          <main className="flex-grow pt-16">
            <Routes>
              {/* public */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/success" element={<AuthSuccess />} />

              {/* protected */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/video-downloader" element={<VideoDownloader />} />
                <Route path="/url-shortner" element={<URLShortner />} />
              </Route>

              {/* redirect system */}
              <Route path="/:id" element={<RedirectHandler />} />

              {/* fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;