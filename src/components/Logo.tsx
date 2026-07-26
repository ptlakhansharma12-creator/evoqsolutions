import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const heights = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12',
    xl: 'h-16',
  };

  return (
    <div className={`inline-flex items-center ${heights[size]} ${className}`}>
      <svg
        viewBox="0 0 114 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto text-white transition-transform hover:scale-[1.02]"
      >
        {/* E - Three horizontal parallel bars */}
        <rect x="0" y="4" width="21" height="4.5" rx="1.5" fill="currentColor" />
        <rect x="0" y="13.5" width="21" height="4.5" rx="1.5" fill="currentColor" />
        <rect x="0" y="23" width="21" height="4.5" rx="1.5" fill="currentColor" />

        {/* V - Sharp diagonal lines */}
        <path
          d="M28.5 4 L37 27.5 L45.5 4"
          stroke="currentColor"
          strokeWidth="4.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
          fill="none"
        />

        {/* O - Stadium rounded rectangle */}
        <rect
          x="52.5"
          y="4"
          width="22.5"
          height="23.5"
          rx="6.5"
          stroke="currentColor"
          strokeWidth="4.5"
          fill="none"
        />

        {/* Q - Stadium rounded rectangle + sharp diagonal slash tail */}
        <rect
          x="82"
          y="4"
          width="22.5"
          height="23.5"
          rx="6.5"
          stroke="currentColor"
          strokeWidth="4.5"
          fill="none"
        />
        <path
          d="M96 17 L109 29.5"
          stroke="currentColor"
          strokeWidth="4.5"
          strokeLinecap="square"
          fill="none"
        />

        {/* SOLUTIONS text below */}
        <text
          x="54"
          y="43"
          textAnchor="middle"
          fontSize="6.8"
          fontWeight="600"
          letterSpacing="6.5"
          fill="currentColor"
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        >
          SOLUTIONS
        </text>
      </svg>
    </div>
  );
}
