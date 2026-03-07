import React from 'react'

const Footer:React.FC = () => {
  return (
     <footer className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col items-center w-full">
            <span className="text-[10px] text-center text-elrey-primary tracking-widest uppercase">&copy; {new Date().getFullYear()} Elrey Technologies</span>
        </div>
        </div>
    </footer>
  )
}

export default Footer