import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6 animate-in fade-in zoom-in duration-500">
      {/* Visual 404 Header */}
      <h1 className="text-9xl font-black text-gray-200 relative">
        404
        <span className="absolute inset-0 flex items-center justify-center text-4xl text-blue-600 mt-2">
          Oops!
        </span>
      </h1>
      
      <div className="max-w-md mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-10 leading-relaxed">
          The link you followed might be broken, or the page may have been removed. 
          Don't worry, even the best explorers get lost sometimes.
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-100 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95"
        >
          Return to Dashboard
        </Link>
      </div>
      
      {/* Branded element */}
      <div className="mt-16 pt-8 border-t border-gray-100 w-full max-w-xs grayscale opacity-40">
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
          Elrey Technologies
        </p>
      </div>
    </div>
  );
};

export default NotFound;