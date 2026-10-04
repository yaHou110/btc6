'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', showSubtitle = true, size = 'md' }: LogoProps) {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* High-tech Hexagonal Cyber Badge with B and Satoshi Orange Pip */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center shrink-0`}>
        <svg
          viewBox="0 0 44 48"
          className="w-full h-full drop-shadow-[0_0_10px_rgba(0,242,254,0.45)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Hexagon outer glow border */}
          <polygon
            points="22,2 41,13 41,35 22,46 3,35 3,13"
            fill="#0b0e14"
            stroke="#00f2fe"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Inner accent ring */}
          <polygon
            points="22,5 38,15 38,33 22,43 6,33 6,15"
            fill="#10131a"
            stroke="#00dce6"
            strokeWidth="0.75"
            opacity="0.6"
          />
          {/* Bold Cyber B Glyph */}
          <path
            d="M14 14 H23 C26 14 27.5 15.5 27.5 18 C27.5 19.8 26.2 21 24.5 21.5 C26.8 22 28.5 23.5 28.5 26.5 C28.5 29.5 26.2 31.5 22.5 31.5 H14 V14 Z M18 17.5 V21 H22.5 C23.8 21 24.5 20.2 24.5 19.2 C24.5 18.2 23.8 17.5 22.5 17.5 H18 Z M18 24.5 V28 H23 C24.5 28 25.2 27.2 25.2 26.2 C25.2 25.2 24.5 24.5 23 24.5 H18 Z"
            fill="#00f2fe"
          />
          {/* Satoshi Orange Pip at top right corner */}
          <circle cx="31" cy="14" r="3.2" fill="#f7931a" className="drop-shadow-[0_0_6px_#f7931a]" />
          <circle cx="31" cy="14" r="1.5" fill="#ffdcbf" />
        </svg>
      </div>

      {/* Brand Wordmark & Subtitle */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-sans font-extrabold tracking-wider text-white ${textSizes[size]}`}>
            BTC<span className="text-[#00f2fe]">6</span>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e475] animate-pulse"></span>
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest mt-0.5">
            <span className="text-[#f7931a] font-bold">TERMINAL</span>
            <span className="text-[#849495]">·</span>
            <span className="text-[#849495]">1H PREDICT</span>
          </div>
        )}
      </div>
    </div>
  );
}
