import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { getGoogleLoginUrl } from "../api/api";

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      await new Promise((res) => setTimeout(res, 400));

      const returnTo = window.location.origin;

      const url = getGoogleLoginUrl(returnTo);

      window.location.href = url;

    } catch (err) {
      console.error("Google login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-24 lg:pt-20 lg:pb-24 px-6 animate-in fade-in duration-1000">

      {/* AUTH CARD */}
      <div className="bg-white border border-slate-100 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10">

        <div className="mb-12 border-l-2 border-elrey-accent pl-6">
            <h2 className="text-3xl font-light text-slate-900 tracking-tight sm:text-4xl">
            Access Portal <br />
            </h2>

            <p className="mt-3 text-slate-500 text-sm font-medium tracking-wide">
            Secure Authentication Gateway
            </p>
        </div>

        <div className="space-y-10">

          {/* LOGIN BUTTON */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-4 bg-elrey-accent text-white text-[11px] font-bold uppercase tracking-[0.3em] rounded-sm
                       hover:bg-elrey-primary hover:shadow-2xl hover:-translate-y-1
                       transition-all duration-400 ease-sleek active:scale-[0.98]
                       disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {loading ? (
              "Redirecting..."
            ) : (
              <>
                <FcGoogle className="text-lg" />
                Continue with Google
              </>
            )}
          </button>

          <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest">
            Authentication required to access tools
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;