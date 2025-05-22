// src/components/FaceClock.tsx
import React from "react";
import ClockHand from "./ClockHands";

const FaceClock: React.FC = () => {
  const centerX = 200;
  const centerY = 200;
  const radius = 190;

  // Dummy handler for play button
  const handleStart = () => {
    // TODO: Implement start logic
    console.log("Play button clicked");
  };

  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  const minuteAngle = minutes * 6 + seconds * 0.1; // 360/60 + seconds smooth movement
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  return (
    <div className="mx-auto w-full max-w-[320px] sm:max-w-[480px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px]">
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        {/* Background style path */}
        <g transform="scale(1.08) translate(-20, -20)">
          <path
            d="M381.25 202.5C381.25 175.23375 374.96875 148.33375 362.8925 123.88675C350.81625 99.439 333.27 78.104375 311.61625 61.534625C289.9625 44.964875 264.78125 33.606625 238.0275 28.341125C211.27375 23.075625 183.6675 24.044375 157.34875 31.172375L203.75 202.5H381.25Z"
            fill="#161F37"
          />
          {/* Yellow Moon */}
          <g transform="translate(210, 125) rotate(15) scale(0.8)">
            <rect
              width="100%"
              height="100%"
              fill="url(#pattern0_69_235)"
              fillOpacity="0.5"
              transform="scale(1.08)"
            />
            <defs>
              <pattern
                id="pattern0_69_235"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1">
                <use xlinkHref="#image0_69_235" transform="scale(0.00390625)" />
              </pattern>
              <image
                id="image0_69_235"
                x="0"
                y="0"
                width="45"
                height="45"
                xlinkHref="data:image/png;base64,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"
              />
            </defs>
          </g>
        </g>

        {/* Outer circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="#f0f0f0"
          fill-opacity="0.2"
          stroke="#ccc"
          strokeWidth="10"
        />
        <g stroke="#272729" strokeWidth="1">
          {[...Array(24)].map((_, i) => {
            const angle = (i / 24) * 2 * Math.PI;
            const x = centerX + radius * Math.sin(angle);
            const y = centerY - radius * Math.cos(angle);

            return (
              <text
                fontWeight={i % 6 === 0 ? "bold" : "normal"}
                fontSize={i % 6 === 0 ? 15 : 11}
                key={i}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#44464a"
                style={{ textShadow: "0 0 2px rgba(0, 0, 0, 0.1)" }}>
                {i}
              </text>
            );
          })}
        </g>

        {/* 24 hour ticks */}
        <g stroke="#333" strokeWidth="2">
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * Math.PI) / 12 - Math.PI / 2; // Rotate to start from top
            const x1 = centerX + Math.cos(angle) * 150;
            const y1 = centerY + Math.sin(angle) * 150;
            const x2 = centerX + Math.cos(angle) * 170;
            const y2 = centerY + Math.sin(angle) * 170;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>
        {/* Hands */}
        <ClockHand
          angle={hourAngle}
          length={100}
          width={3}
          color="#333"
          centerX={centerX}
          centerY={centerY}
        />
        <ClockHand
          angle={minuteAngle}
          length={140}
          width={2}
          color="#333"
          centerX={centerX}
          centerY={centerY}
        />
        {/* Play button (center circle with triangle) */}
        <g onClick={handleStart}>
          <circle cx={centerX} cy={centerY} r={20} fill="#333" />
          {/* Play triangle */}
          <polygon
            points={`
            ${centerX - 6},${centerY - 10}
            ${centerX - 6},${centerY + 10}
            ${centerX + 10},${centerY}
          `}
            fill="yellow"
          />
        </g>
      </svg>
      <button className="absolute inset-0" onClick={handleStart}>
        {/* Play button (center circle with triangle) */}
        <g onClick={handleStart}>
          <circle cx={centerX} cy={centerY} r={20} fill="#333" />
          {/* Play triangle */}
          <polygon
            points={`
            ${centerX - 6},${centerY - 10}
            ${centerX - 6},${centerY + 10}
            ${centerX + 10},${centerY}
          `}
            fill="yellow"
          />
        </g>
      </button>
    </div>
  );
};

export default FaceClock;
