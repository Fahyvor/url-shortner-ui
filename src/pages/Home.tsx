import React, { useState } from 'react';
import { AxiosError } from 'axios';
import api, { ShortenResponse, ApiError } from '../api/api';
import { toast, SleekToast } from 'sleek-toast';

const Home: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [shortenedUrl, setShortenedUrl] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResult('');

    try {
      const response = await api.post<ShortenResponse & { message?: string }>('/url/shorten', {
        url,
        shortenedUrl
      });

      if (response.status === 200) {
        toast.success(response.data.message || 'Asset Link Generated');
        setResult(response.data.shortUrl);
        setUrl('');
        setShortenedUrl('');
      }
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      const msg = axiosError.response?.data?.error || 'System unavailable. Try again later.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto pt-16 pb-24 px-6 animate-in fade-in duration-1000">
      <SleekToast />
      
      {/* Mature Header Section */}
      <div className="mb-12 border-l-2 border-slate-900 pl-6">
        <h2 className="text-3xl font-light text-slate-900 tracking-tight sm:text-4xl">
          Infrastructure for <br />
          <span className="font-bold">Digital Connectivity.</span>
        </h2>
        <p className="mt-3 text-slate-500 text-sm font-medium tracking-wide">
          Secure URL Management by Elrey Technologies.
        </p>
      </div>

      <div className="bg-white border border-slate-100 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="group">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 group-focus-within:text-elrey-accent transition-colors">
              Destination Endpoint
            </label>
            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://resource.elrey.io/v1/data"
              className="w-full bg-transparent border-b border-elrey-border py-2 
             focus:border-elrey-primary outline-none text-elrey-primary 
             transition-all duration-400 ease-sleek"
            />
          </div>

          <div className="group">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 group-focus-within:text-elrey-accent transition-colors">
              Custom Identifier
            </label>
            <input
              type="text"
              required
              value={shortenedUrl}
              onChange={(e) => setShortenedUrl(e.target.value)}
              placeholder="e.g. q1-report"
              className="w-full bg-transparent border-b border-slate-200 py-2 focus:border-slate-900 outline-none transition-colors text-slate-900 placeholder:text-slate-300 font-mono text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-elrey-accent text-white text-[11px] font-bold uppercase tracking-[0.3em] rounded-sm 
             hover:bg-elrey-primary hover:shadow-2xl hover:-translate-y-1
             transition-all duration-400 ease-sleek active:scale-[0.98]"
          >
            {loading ? 'Processing...' : 'Generate Asset Link'}
          </button>
        </form>

        {result && (
          <div className="mt-12 pt-10 border-t border-slate-50 animate-in slide-in-from-bottom-4 duration-500">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Internal Redirect Ready</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                readOnly 
                value={result} 
                className="flex-1 bg-slate-50 text-xs px-4 py-4 rounded-sm border border-slate-100 text-slate-600 font-mono focus:outline-none"
              />
              <button 
                onClick={() => { 
                  navigator.clipboard.writeText(result); 
                  toast.success('Link Copied to Clipboard');
                }}
                className="bg-elrey-accent text-white px-8 py-4 rounded-sm text-[11px] font-bold uppercase tracking-widest hover:bg-elrey-primary cursor-pointer transition-colors shadow-lg shadow-indigo-100"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Subtle branding detail */}
      <div className="mt-12 flex items-center justify-center space-x-4 opacity-20">
        <div className="h-[1px] w-12 bg-slate-900"></div>
        <span className="text-[10px] font-bold tracking-[0.5em] text-slate-900 uppercase">Elrey Systems</span>
        <div className="h-[1px] w-12 bg-slate-900"></div>
      </div>
    </div>
  );
};

export default Home;