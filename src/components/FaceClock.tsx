// src/components/FaceClock.tsx
import React, { useState, useEffect } from "react";
import ClockHand from "./ClockHands";
import TimeBlockArc from "./TimeBlockArc";

const FaceClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const centerX = 200;
  const centerY = 200;
  const radius = 190;

  // Dummy handler for play button
  const handleStart = () => {
    // TODO: Implement start logic
    console.log("Play button clicked");
  };

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourAngle = ((hours % 24) + minutes / 60) * 15 - 90; // 360/60 + seconds smooth movement
  const minuteAngle = (minutes + seconds / 60) * 6 - 90;

  // 🎨 Determine background color based on time
  let backgroundColor = "#f0f0f0"; // default day
  let backgroundOpacity = 1;
  if (hours >= 18 && hours < 20) {
    backgroundColor = "#ffd59e"; // evening
    backgroundOpacity = 0.85;
  } else if (hours >= 20 || hours < 6) {
    backgroundColor = "#0b1d3a"; // night
    backgroundOpacity = 0.2;
  }

  return (
    <div className="mx-auto w-full max-w-[320px] sm:max-w-[480px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px]">
      {/* The SVG clock face */}
      <svg
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        style={{ background: backgroundColor, borderRadius: "50%" }}>
        {/* Background with dynamic color and opacity */}
        <rect
          width="400"
          height="400"
          fill={backgroundColor}
          opacity={backgroundOpacity}
        />

        {/* Outer circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="#f0f0f0"
          fillOpacity={0.4}
          stroke="#ccc"
          strokeWidth="7"
        />
        {/* 24 numbers */}
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

        {/* Scheduled time blocks */}
        <TimeBlockArc
          startHour={22}
          endHour={6}
          radius={170}
          centerX={centerX}
          centerY={centerY}
          color="white"
          opacity={0.7}
        />
        <TimeBlockArc
          startHour={9}
          endHour={17}
          radius={170}
          centerX={centerX}
          centerY={centerY}
          color="red"
          opacity={0.5}
        />
        <TimeBlockArc
          startHour={18}
          endHour={19}
          radius={170}
          centerX={centerX}
          centerY={centerY}
          color="#22c55e"
          opacity={0.6}
        />
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
