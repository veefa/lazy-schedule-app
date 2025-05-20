// src/components/FaceClock.tsx

import React from 'react';

const FaceClock: React.FC = () => {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle */}
      <circle cx="200" cy="200" r="190" fill="#f0f0f0" stroke="#ccc" strokeWidth="10" />
      
      {/* Center dot */}
      <circle cx="200" cy="200" r="10" fill="#333" />
      
      {/* 24 hour ticks */}
      <g stroke="#333" strokeWidth="2">
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * Math.PI) / 12 - Math.PI / 2; // Rotate to start from top
          const x1 = 200 + Math.cos(angle) * 150;
          const y1 = 200 + Math.sin(angle) * 150;
          const x2 = 200 + Math.cos(angle) * 170;
          const y2 = 200 + Math.sin(angle) * 170;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>
    </svg>
  );
};

export default FaceClock;