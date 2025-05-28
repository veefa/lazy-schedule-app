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
  type Task = {
    id: number;
    name: string;
    startHour: number;
    endHour: number;
    color: string;
  };

  const [tasks, setTasks] = useState<Task[]>([]);

  const [newTask, setNewTask] = useState({
    name: "",
    startHour: 0,
    endHour: 1,
    color: "#8b5cf6", // Violet as default
  });

  const handleAddTask = () => {
    if (
      newTask.name &&
      newTask.startHour !== newTask.endHour &&
      newTask.startHour >= 0 &&
      newTask.endHour <= 23.99
    ) {
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
        {/* Background style path */}
        <path
          d="M305 162C305 140.187 299.975 118.667 290.314 99.1094C280.653 79.5521 266.616 62.4835 249.293 49.2277C231.969 35.9719 211.825 26.8853 190.422 22.6729C169.019 18.4605 146.934 19.2355 125.879 24.9379L163 162H305Z"
          fill="#161F37"
          fillOpacity="0.35"
        />
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
        {tasks.map((task, idx) => {
          // Calculate the middle angle of the arc
          const startAngle =
            ((task.startHour / 24) * 360 - 90) * (Math.PI / 180);
          const endAngle = ((task.endHour / 24) * 360 - 90) * (Math.PI / 180);

          // Fix: handle arcs that cross midnight
          let midAngle;
          if (task.endHour > task.startHour) {
            midAngle = (startAngle + endAngle) / 2;
          } else {
            // Arc crosses midnight
            const start = (task.startHour / 24) * 360;
            const end = ((task.endHour + 24) / 24) * 360;
            const mid = (start + end) / 2;
            midAngle = ((mid - 90) * Math.PI) / 180;
          }
          const arcRadius = 170 - idx * 12; // <-- Give each arc a unique radius
          const textRadius = radius * 0.4; // 40% of the clock radius, close to center
          const textX = centerX + Math.cos(midAngle) * textRadius;
          const textY = centerY + Math.sin(midAngle) * textRadius;

          return (
            <React.Fragment key={task.id}>
              <TimeBlockArc
                startHour={task.startHour}
                endHour={task.endHour}
                radius={arcRadius} // <-- use arcRadius here!
                centerX={centerX}
                centerY={centerY}
                color={task.color}
                opacity={0.5}
              />
              <text
                x={textX}
                y={textY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={13}
                fontWeight="bold"
                fill="#22223b"
                style={{
                  pointerEvents: "none",
                  userSelect: "none",
                  letterSpacing: 0.5,
                }}>
                {task.name}
              </text>
            </React.Fragment>
          );
        })}
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
        {/* center dot*/}
        <circle cx={centerX} cy={centerY} r={7} fill="#333" />
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
            step="0.01"
            placeholder="Start hour"
            className="px-2 py-1 border rounded w-1/2"
            value={newTask.startHour}
            onChange={(e) => {
              let value = Number(e.target.value);
              if (isNaN(value)) value = 0;
              if (value < 0) value = 0;
              if (value > 23.99) value = 23.99;
              setNewTask((prev) => ({
                ...prev,
                startHour: value,
              }));
            }}
            min={0}
            max={23.99}
          />
          <input
            type="number"
            step="0.01"
            placeholder="End hour"
            className="px-2 py-1 border rounded w-1/2"
            value={newTask.endHour}
            onChange={(e) => {
              let value = Number(e.target.value);
              if (isNaN(value)) value = 1;
              if (value < 0) value = 0;
              if (value > 23.99) value = 23.99;
              setNewTask((prev) => ({
                ...prev,
                endHour: value,
              }));
            }}
            min={0}
            max={23.99}
          />
          {/* Color picker for task */}
          <input
            type="color"
            className="p-0 border rounded w-10 h-10"
            value={newTask.color}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, color: e.target.value }))
            }
            title="Pick task color"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleAddTask}
            className="flex-1 bg-green-600 px-4 py-1 rounded text-white"
            disabled={
              !newTask.name ||
              newTask.startHour === newTask.endHour ||
              newTask.startHour < 0 ||
              newTask.endHour > 23.99
            }>
            Add Task
          </button>
          <button
            onClick={() => {
              setTasks([]);
              setNewTask({
                name: "",
                startHour: 0,
                endHour: 1,
                color: "#8b5cf6",
              });
            }}
            className="flex-1 bg-red-500 px-4 py-2 rounded text-white"
            type="button">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default FaceClock;
