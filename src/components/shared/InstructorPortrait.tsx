import React from 'react';

interface InstructorPortraitProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_CLASSES: Record<NonNullable<InstructorPortraitProps['size']>, string> = {
  xs: 'w-9 h-9 rounded-lg',
  sm: 'w-11 h-11 rounded-xl',
  md: 'w-16 h-16 rounded-xl',
  lg: 'w-full aspect-[4/5] max-w-[320px] rounded-2xl',
};

export function InstructorPortrait({ size = 'md', className = '' }: InstructorPortraitProps) {
  return (
    <div
      className={`relative overflow-hidden bg-[#0B0D17] border border-white/15 shrink-0 select-none ${SIZE_CLASSES[size]} ${className}`}
      role="img"
      aria-label="Sabik — Founder and AI Product Engineer portrait"
    >
      <svg
        viewBox="0 0 320 400"
        className="w-full h-full block"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="sabikBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#131728" />
            <stop offset="65%" stopColor="#0B0D17" />
            <stop offset="100%" stopColor="#080A12" />
          </linearGradient>
          <radialGradient id="sabikGlow" cx="50%" cy="32%" r="55%">
            <stop offset="0%" stopColor="#A5F51F" stopOpacity="0.16" />
            <stop offset="60%" stopColor="#3B82F6" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#0B0D17" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sabikSuit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#242A45" />
            <stop offset="100%" stopColor="#111525" />
          </linearGradient>
          <linearGradient id="sabikFace" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D7DCEB" />
            <stop offset="100%" stopColor="#949CB8" />
          </linearGradient>
        </defs>

        {/* Backdrop */}
        <rect width="320" height="400" fill="url(#sabikBg)" />
        <rect width="320" height="400" fill="url(#sabikGlow)" />

        {/* Subtle Architectural Grid */}
        <g stroke="#FFFFFF" strokeOpacity="0.05" strokeWidth="1">
          <line x1="40" y1="0" x2="40" y2="400" />
          <line x1="100" y1="0" x2="100" y2="400" />
          <line x1="160" y1="0" x2="160" y2="400" />
          <line x1="220" y1="0" x2="220" y2="400" />
          <line x1="280" y1="0" x2="280" y2="400" />
          <line x1="0" y1="80" x2="320" y2="80" />
          <line x1="0" y1="160" x2="320" y2="160" />
          <line x1="0" y1="240" x2="320" y2="240" />
          <line x1="0" y1="320" x2="320" y2="320" />
        </g>

        {/* Editorial Lime Arc */}
        <circle
          cx="160"
          cy="148"
          r="98"
          fill="none"
          stroke="#A5F51F"
          strokeOpacity="0.22"
          strokeWidth="1.25"
          strokeDasharray="6 6"
        />

        {/* Shoulders & Minimalist Jacket */}
        <path
          d="M36 400 C40 318 86 276 160 276 C234 276 280 318 284 400 Z"
          fill="url(#sabikSuit)"
          stroke="#FFFFFF"
          strokeOpacity="0.14"
          strokeWidth="1.5"
        />
        {/* Collar & Tee */}
        <path
          d="M126 276 L160 326 L194 276 Z"
          fill="#0B0D17"
          stroke="#FFFFFF"
          strokeOpacity="0.12"
          strokeWidth="1.2"
        />
        {/* Neck */}
        <rect x="140" y="228" width="40" height="54" rx="14" fill="#AEB5CE" />

        {/* Head Silhouette */}
        <path
          d="M110 156 C110 112 132 90 160 90 C188 90 210 112 210 156 C210 202 188 238 160 238 C132 238 110 202 110 156 Z"
          fill="url(#sabikFace)"
        />
        {/* Stylized Hair */}
        <path
          d="M107 152 C104 110 128 76 162 76 C198 76 216 108 213 150 C208 124 188 112 162 112 C136 112 118 126 107 152 Z"
          fill="#15192B"
        />
        {/* Minimalist Eyewear Accent */}
        <g stroke="#0B0D17" strokeWidth="2.4" fill="none">
          <rect x="122" y="148" width="30" height="19" rx="5" />
          <rect x="168" y="148" width="30" height="19" rx="5" />
          <line x1="152" y1="157" x2="168" y2="157" />
        </g>

        {/* Subtle Lime Rim Highlight */}
        <path
          d="M210 156 C210 202 188 238 160 238"
          fill="none"
          stroke="#A5F51F"
          strokeOpacity="0.55"
          strokeWidth="2"
        />

        {/* Corner Coordinate Label (only visible in larger portrait sizes via proportions) */}
        {size === 'lg' && (
          <g>
            <rect x="16" y="346" width="288" height="38" rx="8" fill="#0B0D17" fillOpacity="0.86" stroke="#FFFFFF" strokeOpacity="0.12" />
            <text
              x="28"
              y="369"
              fill="#A5F51F"
              fontFamily="JetBrains Mono, monospace"
              fontSize="11"
              fontWeight="600"
            >
              SABIK · ARCHITECT · 4 YRS EXP
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
