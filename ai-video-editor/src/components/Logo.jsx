import React from 'react';

const Logo = ({ size = "md", showText = true }) => {
  // Ultra-clean, scalable responsive size classes
  // Ensured perfect unified vertical centering values and optical spacing
  const sizes = {
    sm: { icon: "w-8 h-8", text: "text-lg", dot: "w-1.5 h-1.5", gap: "gap-3" },
    md: { icon: "w-10 h-10", text: "text-xl md:text-2xl", dot: "w-2 h-2", gap: "gap-4" },
    lg: { icon: "w-20 h-20 md:w-24 md:h-24", text: "text-4xl md:text-6xl", dot: "w-3 h-3", gap: "gap-6 md:gap-8" },
  };

  const { icon, text, dot, gap } = sizes[size] || sizes.md;

  return (
    <div className={`flex items-center ${gap} group cursor-pointer`}>
      {/* Minimal Premium Monogram (LH) */}
      <div className={`relative flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(96,165,250,0.1)] transition-all duration-500 group-hover:border-blue-400/40 group-hover:shadow-[0_0_25px_rgba(96,165,250,0.25)] ${icon}`}>
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-[55%] h-[55%]"
        >
          {/* Custom minimalistic LH geometric interlacing vector */}
          {/* White 'L' */}
          <path d="M7 4V20H13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Neon Blue 'H' stem and crossbar */}
          <path d="M17 4V20" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M12 12H17" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Typography Text - Perfectly Vertically Centered */}
      {showText && (
        <div className="flex items-center">
          <span className={`font-sans font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-50 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] ${text}`}>
            LALIT
          </span>
          <span className={`font-sans font-normal tracking-tight text-slate-300 ml-2 md:ml-3 ${text}`}>
            HIRVEY
          </span>
          {/* Subtle accent dot perfectly centered matching the text baseline optical gravity */}
          <div className={`${dot} bg-blue-500 rounded-full ml-3 md:ml-4 shadow-[0_0_12px_rgba(96,165,250,0.7)]`}></div>
        </div>
      )}
    </div>
  );
};

export default Logo;
