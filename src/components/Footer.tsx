import React from 'react'

const Footer:React.FC = () => {
  return (
     <footer id="about" className="w-full border-t border-stone-200 bg-[#F5F2EB]/40 py-16 scroll-mt-20">
        <div className="w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-elrey-accent mb-3">THE LAB</h4>
            <p className="text-xs text-stone-600 leading-relaxed font-light">
              <strong className="text-stone-900">OxidLabs</strong> operates as an open digital utility suite. We build web performance utilities focusing on fast content redirection proxy networks and media asset extraction engines for modern platforms.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-elrey-primary mb-3">COMPLIANCE & REPOSITORIES</h4>
            <p className="text-xs text-stone-600 leading-relaxed font-light">
              Maintained, licensed, and deployed globally by <strong className="text-stone-900">Elrey Technologies.</strong> All application components, cloud routes, and platform analytics are securely processed under standard regional privacy and hosting parameters.
            </p>
          </div>
        </div>
        <div className="w-full mx-auto px-6 mt-12 pt-6 border-t border-stone-200 text-center">
          <p className="text-[10px] font-mono text-slate-400">© 2026 Elrey Technologies & OxidLabs. All Rights Reserved.</p>
        </div>
      </footer>
  )
}

export default Footer