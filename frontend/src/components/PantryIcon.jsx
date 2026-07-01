import React from 'react';

function PantryIcon({ size = 64, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pg1" x1="0" x2="1">
          <stop offset="0" stopColor="#FFF1F6" />
          <stop offset="1" stopColor="#FFEFF6" />
        </linearGradient>
        <linearGradient id="pg2" x1="0" x2="1">
          <stop offset="0" stopColor="#FFB7C5" />
          <stop offset="1" stopColor="#FF69B4" />
        </linearGradient>
      </defs>

      {/* circular badge background */}
      <circle cx="100" cy="100" r="96" fill="url(#pg1)" stroke="#FFB7C5" strokeWidth="4" />

      {/* left: stylized pantry/fridge */}
      <g transform="translate(22,34)">
        <rect x="0" y="0" width="76" height="108" rx="6" fill="#FFF8F3" stroke="#E78AA6" strokeWidth="2" />
        <rect x="6" y="14" width="64" height="10" rx="2" fill="#FFDDE6" />
        <rect x="10" y="30" width="56" height="6" rx="1.5" fill="#FFE9D6" />
        <rect x="10" y="46" width="56" height="6" rx="1.5" fill="#FFF1C7" />

        {/* jars and pantry items */}
        <g>
          <rect x="14" y="36" width="12" height="18" rx="2" fill="#DFF3D9" stroke="#2E6B3A" strokeWidth="0.8" />
          <rect x="32" y="36" width="12" height="18" rx="2" fill="#FFD9C7" stroke="#B67A4A" strokeWidth="0.8" />
          <rect x="50" y="36" width="12" height="18" rx="2" fill="#FFF1C7" stroke="#B67A4A" strokeWidth="0.8" />
          <rect x="14" y="60" width="48" height="16" rx="3" fill="#FFE9D6" stroke="#D9976E" strokeWidth="0.6" />
          <rect x="16" y="66" width="10" height="6" rx="2" fill="#E05A2A" />
          <rect x="36" y="66" width="10" height="6" rx="2" fill="#2E6B3A" />
        </g>
      </g>

      {/* arrow to plate */}
      <g>
        <path d="M108 86 L138 86" stroke="#FF6F9A" strokeWidth="6" strokeLinecap="round" />
        <path d="M132 76 L142 86 L132 96" fill="#FF6F9A" stroke="#FF6F9A" strokeWidth="1" strokeLinejoin="round" />
      </g>

      {/* right: plate with stylized pasta */}
      <g transform="translate(120,64)">
        <ellipse cx="0" cy="36" rx="40" ry="24" fill="#FFFFFF" stroke="#E78AA6" strokeWidth="2" />
        <path d="M-28 36 C-18 8, 36 8, 48 36 C36 50, -18 50, -28 36 Z" fill="#FFE9D6" stroke="#D9976E" strokeWidth="1" />

        {/* pasta swirls */}
        <path d="M-8 30 C0 26, 8 34, 18 28" stroke="#FF8AA6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M2 34 C8 30, 18 36, 26 32" stroke="#FF7A8F" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* veggies */}
        <circle cx="-2" cy="28" r="3" fill="#2E6B3A" />
        <circle cx="12" cy="30" r="3" fill="#E05A2A" />

        {/* steam heart */}
        <path d="M18 12 C22 6, 34 6, 36 12 C34 8, 30 6, 28 10 C26 6, 20 6, 18 12 Z" fill="#FFB7C5" opacity="0.9" />
      </g>

      {/* subtle leaf accent */}
      <path d="M160 66 C168 74, 170 86, 150 96" stroke="#2E6B3A" strokeWidth="2" fill="none" strokeLinecap="round" />

    </svg>
  );
}

export default PantryIcon;
