import React from 'react';

function CryingFridgeIcon({ size = 42 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="18" y="8" width="28" height="48" rx="6" fill="#FFF3F7" stroke="#D45A7A" strokeWidth="3" />
      <rect x="18" y="30" width="28" height="4" fill="#D45A7A" opacity="0.35" />
      <rect x="41" y="15" width="3" height="10" rx="1.5" fill="#D45A7A" />
      <rect x="41" y="36" width="3" height="10" rx="1.5" fill="#D45A7A" />
      <circle cx="28" cy="24" r="2.5" fill="#D45A7A" />
      <circle cx="38" cy="24" r="2.5" fill="#D45A7A" />
      <path d="M27 39C29.2 36.5 34.8 36.5 37 39" stroke="#D45A7A" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 12C20 12 17 15 17 19" stroke="#D45A7A" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />
      <path d="M17 20C15 20 13.5 21.5 13.5 23.5" stroke="#D45A7A" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />
      <path d="M48 44C50.5 47 50.5 51 47.8 53.8" stroke="#5DB7E8" strokeWidth="3" strokeLinecap="round" />
      <path d="M45 48C46.2 50 46.2 52 45 54" stroke="#5DB7E8" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M16 56C16 56 18.5 58.5 21 56" stroke="#D45A7A" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

export default CryingFridgeIcon;