import React, { useState } from 'react';
import { toast, SleekToast } from 'sleek-toast';
import { FcGoogle } from "react-icons/fc";

interface UserProfile {
  name: string;
  email: string;
  picture: string;
}

const Home: React.FC = () => {
  // Auth & UI States
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  const handleGoogleLogin = () => {
    setIsAuthenticated(true);
    setUser({
      name: "Core Engineer",
      email: "ops@oxidlabs.click",
      picture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"
    });
    toast.success('Access Granted via Google');
  };


  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 antialiased selection:bg-elrey-accent selection:text-[#FDFBF7]">
      <SleekToast />

      {/* Hero Header Block */}
      <header className="w-full mx-auto pt-32 pb-16 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5F2EB] border border-stone-200/60 rounded-full mb-6">
          <span className="flex h-1.5 w-1.5 rounded-full bg-elrey-accent" />
          <p className="text-[10px] font-mono tracking-widest text-stone-600 uppercase">System Status: Operational</p>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extralight text-stone-900 tracking-tight leading-tight max-w-3xl mx-auto">
          High-Performance Routing for <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-elrey-accent via-elrey-primary to-stone-900">Modern Web Content.</span>
        </h1>
        <p className="mt-6 text-stone-500 text-sm max-w-lg mx-auto font-light leading-relaxed">
          Enterprise url compression, ultra-fast serverless redirection, and high-speed media processing layers engineered by Elrey Technologies.
        </p>
      </header>

      {/* Product Grid Section */}
      <section id="products" className="w-full mx-auto px-6 py-8 scroll-mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#F5F2EB]/50 border border-stone-200 rounded-lg p-6 hover:border-elrey-accent/40 transition-all">
            <div className="font-mono text-xs text-elrey-accent font-bold mb-3">01 // LINK UTILITY</div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-2">URL Shortening</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-light">Transform massive tracking URLs, affiliate structures, and long-form web addresses into clean, highly brandable short links.</p>
          </div>
          <div className="bg-[#F5F2EB]/50 border border-stone-200 rounded-lg p-6 hover:border-elrey-accent/40 transition-all">
            <div className="font-mono text-xs text-elrey-primary font-bold mb-3">02 // MEDIA STREAMING</div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-2">Video Downloader</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-light">Instantly target, resolve, and package source media formats from high-traffic video channels directly to cloud storage paths.</p>
          </div>
          <div className="bg-[#F5F2EB]/80 border border-stone-200 rounded-lg p-6 hover:border-elrey-accent/40 transition-all">
            <div className="font-mono text-xs text-elrey-accent font-bold mb-3">03 // PLATFORM SECURITY</div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-2">SSO Access Control</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-light">Secured with single sign-on parameters. Restrict configuration management and dashboard tools exclusively to authorized users.</p>
          </div>
        </div>
      </section>

      {/* Twin Engine Panel Section (Forms) */}
      <section className="w-full mx-auto px-6 py-12">
          <div className="bg-[#F5F2EB]/60 border border-stone-200 rounded-md p-12 text-center max-w-xl mx-auto shadow-sm backdrop-blur-sm animate-in fade-in duration-500">
            <div className="w-10 h-10 rounded-md bg-white border border-stone-200 flex items-center justify-center mx-auto mb-4 shadow-sm">
              <svg className="w-4 h-4 text-elrey-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
            </div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900">Explore Oxidlabs</h3>
            <p className="text-xs text-stone-500 mt-2 mb-6 max-w-xs mx-auto font-light">Secure authentication required to create short URLs or deploy video downloading queues.</p>
            
            <button
              onClick={() => window.location.href="/login"}
              className="w-full py-3.5 bg-elrey-accent text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-sm 
               hover:bg-elrey-primary flex items-center justify-center gap-3 transition-all duration-300 font-mono shadow-sm cursor-pointer"
            >
              <>
                <FcGoogle className="text-lg" />
                Continue with Google
              </>
            </button>
          </div>
      </section>

      {/* Global Cloud Network Traffic */}
      <section className="w-full mx-auto px-6 py-12 border-t border-stone-200/60">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-elrey-accent">// GLOBAL SERVER TELEMETRY</h2>
            <p className="text-xs text-stone-500 font-light mt-1">Real-time load balancing and request response times across core web regions.</p>
          </div>
          <div className="text-[10px] font-mono bg-[#F5F2EB] border border-stone-200 px-3 py-1 rounded text-stone-600">
            METRICS REFRESH: 1s
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { zone: "US-East (N. Virginia)", ping: "14ms", load: "31%" },
            { zone: "EU-West (London)", ping: "22ms", load: "14%" },
            { zone: "EU-Central (Frankfurt)", ping: "29ms", load: "48%" },
            { zone: "AF-South (Lagos)", ping: "8ms", load: "25%" }
          ].map((cluster, idx) => (
            <div key={idx} className="bg-white border border-stone-200 p-4 rounded shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <span className="font-mono text-xs font-bold text-stone-900">{cluster.zone}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-stone-500">
                  <span>LATENCY:</span>
                  <span className="text-stone-900 font-bold">{cluster.ping}</span>
                </div>
                <div className="flex justify-between text-[10px] font-mono text-stone-500">
                  <span>TRAFFIC LOAD:</span>
                  <span className="text-stone-900">{cluster.load}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Developer API Integration Block */}
      {/* <section className="max-w-3xl mx-auto px-6 py-12 border-t border-stone-200/60">
        <div className="mb-6">
          <h2 className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-elrey-primary">// REST API INTEGRATION</h2>
          <p className="text-xs text-stone-500 font-light mt-1">Create short links programmatically via rapid HTTP POST web requests.</p>
        </div>
        
        <div className="bg-[#F5F2EB] border border-stone-200/80 rounded p-5 font-mono text-xs text-stone-800">
          <div className="text-[10px] text-stone-400 uppercase tracking-widest mb-3 border-b border-stone-200/60 pb-2 flex justify-between">
            <span>HTTP REQUEST HEADERS</span>
            <span className="text-elrey-accent font-bold">POST</span>
          </div>
          <pre className="overflow-x-auto whitespace-pre leading-relaxed text-stone-700">
            {`curl -X POST https://api.oxidlabs.click/v1/url/shorten \\
            -H "Authorization: Bearer YOUR_API_ACCESS_TOKEN" \\
            -H "Content-Type: application/json" \\
            -d '{
                "url": "https://yourwebsite.com/long-promotional-link",
                "shortenedUrl": "custom-campaign"
            }'`}
          </pre>
        </div>
      </section> */}
    </div>
  );
};

export default Home;