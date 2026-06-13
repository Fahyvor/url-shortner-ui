import React, { useState } from "react";

interface NavbarProps {
  isAuthenticated?: boolean;
  userEmail?: string;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isAuthenticated,
  userEmail,
  onLogout,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full fixed top-0 left-0 z-50 border-b border-stone-200 bg-[#FDFBF7]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* BRAND */}
          <a href="/" className="flex items-center gap-3">
            <img
              src="./elreyLogo.png"
              alt="Logo"
              className="w-5 h-5 object-contain"
            />
            <span className="font-mono text-xs font-bold tracking-[0.35em] uppercase text-stone-900">
              OXID<span className="font-light text-elrey-accent">LABS</span>
            </span>
          </a>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-2">

            <a
              href="/url-shortner"
              className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-600 hover:text-elrey-accent px-3 py-1.5 rounded transition"
            >
              URL Shortener
            </a>

            <a
              href="/video-downloader"
              className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-600 hover:text-elrey-accent px-3 py-1.5 rounded transition"
            >
              Video Downloader
            </a>

            {isAuthenticated && (
              <div className="flex items-center gap-3 pl-4 ml-2 border-l border-stone-200">
                <span className="text-[10px] font-mono text-stone-400">
                  {userEmail}
                </span>

                <button
                  onClick={onLogout}
                  className="text-[10px] font-mono uppercase font-bold tracking-widest text-elrey-accent hover:text-elrey-primary px-2 py-1 bg-elrey-accent/5 rounded"
                >
                  [ Exit ]
                </button>
              </div>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden flex flex-col gap-1"
          >
            <span className="w-5 h-[2px] bg-stone-900"></span>
            <span className="w-5 h-[2px] bg-stone-900"></span>
            <span className="w-5 h-[2px] bg-stone-900"></span>
          </button>
        </div>
      </nav>

      {/* OVERLAY */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity md:hidden ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* MOBILE DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-[75%] max-w-sm bg-white z-50 shadow-lg transform transition-transform duration-300 md:hidden
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 flex flex-col gap-6">

          {/* CLOSE */}
          <button
            onClick={() => setOpen(false)}
            className="self-end text-sm font-mono text-stone-600"
          >
            ✕
          </button>

          {/* LINKS */}
          <a
            href="/url-shortner"
            onClick={() => setOpen(false)}
            className="font-mono text-sm uppercase tracking-widest text-stone-700"
          >
            URL Shortener
          </a>

          <a
            href="/video-downloader"
            onClick={() => setOpen(false)}
            className="font-mono text-sm uppercase tracking-widest text-stone-700"
          >
            Video Downloader
          </a>

          {/* AUTH */}
          {isAuthenticated && (
            <div className="border-t pt-4 flex flex-col gap-3">
              <span className="text-xs font-mono text-stone-400 break-all">
                {userEmail}
              </span>

              <button
                onClick={() => {
                  onLogout?.();
                  setOpen(false);
                }}
                className="text-[11px] font-mono uppercase font-bold tracking-widest text-elrey-accent bg-elrey-accent/5 px-3 py-1 rounded w-fit"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;