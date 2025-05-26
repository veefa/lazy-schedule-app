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
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Morning Routine",
      startHour: 6,
      endHour: 8,
      color: "#22c55e",
    },
    {
      id: 2,
      name: "Work Session",
      startHour: 9,
      endHour: 17,
      color: "#ef4444",
    },
    {
      id: 3,
      name: "Evening Study",
      startHour: 18,
      endHour: 20,
      color: "#3b82f6",
    },
  ]);

  const [newTask, setNewTask] = useState({
    name: "",
    startHour: 0,
    endHour: 1,
    color: "#8b5cf6", // Violet as default
  });

  const handleAddTask = () => {
    if (newTask.name && newTask.startHour < newTask.endHour) {
      setTasks((prev) => [
        ...prev,
        {
          ...newTask,
          id: prev.length + 1,
        },
      ]);
      setNewTask({ name: "", startHour: 0, endHour: 1, color: "#8b5cf6" });
    }
  };

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
        {tasks.map((task) => (
          <TimeBlockArc
            key={task.id}
            startHour={task.startHour}
            endHour={task.endHour}
            radius={170}
            centerX={centerX}
            centerY={centerY}
            color={task.color}
            opacity={0.5}
          />
        ))}
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
      <div className="space-y-2 mt-4 px-4">
        <input
          type="text"
          placeholder="Task name"
          className="px-2 py-1 border rounded w-full"
          value={newTask.name}
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Start hour"
            className="px-2 py-1 border rounded w-1/2"
            value={newTask.startHour}
            onChange={(e) =>
              setNewTask((prev) => ({
                ...prev,
                startHour: Number(e.target.value),
              }))
            }
            min={0}
            max={23}
          />
          <input
            type="number"
            placeholder="End hour"
            className="px-2 py-1 border rounded w-1/2"
            value={newTask.endHour}
            onChange={(e) =>
              setNewTask((prev) => ({
                ...prev,
                endHour: Number(e.target.value),
              }))
            }
            min={0}
            max={23}
          />
        </div>
        <button
          onClick={handleAddTask}
          className="bg-green-600 px-4 py-1 rounded text-white">
          Add Task
        </button>
      </div>
    </div>
  );
};

export default FaceClock;
