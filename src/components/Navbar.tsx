import React from 'react'

const Navbar:React.FC = () => {
  return (
    <nav className="bg-white border-b border-slate-200 h-20 flex items-center">
        <div className="mx-auto w-full lg:px-20 px-6 flex justify-between items-center">
        <a href="/" className="flex items-center gap-3">
            {/* <div className="w-6 h-6 bg-elrey-primary rounded-sm transform rotate-45" /> */}
            <img src='./elreyLogo.png' alt='Elrey Logo' className="w-8" />
            <span className="text-sm font-black tracking-[0.3em] uppercase text-elrey-primary">
            Elrey <span className="font-light text-slate-400">Technologies</span>
            </span>
        </a>
        <a href='/video-downloader'>
          <span className="text-sm bg-elrey-primary text-white rounded-lg p-2 cursor-pointer hover:bg-elrey-accent transition-colors">
            Video Downloader
          </span>
        </a>
        </div>
    </nav>
  )
}

export default Navbar