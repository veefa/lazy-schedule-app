import React from "react";

interface TimeBlockArcProps {
  startHour: number;
  endHour: number;
  radius: number;
  centerX: number;
  centerY: number;
  color: string;
  opacity?: number;
}
const TimeBlockArc: React.FC<TimeBlockArcProps> = ({
  startHour,
  endHour,
  radius,
  centerX,
  centerY,
  color,
  opacity = 0.5,
}) => {
  // Convert hours to angles (0h = -90°, clockwise)
  const startAngle = (startHour * 15 - 90) * (Math.PI / 180);
  const endAngle = (endHour * 15 - 90) * (Math.PI / 180);

 // Arc coordinates
  const x1 = centerX + radius * Math.cos(startAngle);
  const y1 = centerY + radius * Math.sin(startAngle);
  const x2 = centerX + radius * Math.cos(endAngle);
  const y2 = centerY + radius * Math.sin(endAngle);

  // Large arc flag
  let largeArcFlag = 0;
  if (endHour > startHour) {
    largeArcFlag = endHour - startHour > 12 ? 1 : 0;
  } else {
    largeArcFlag = 24 - startHour + endHour > 12 ? 1 : 0;
  }

  return (
    <path
      d={`
        M ${centerX},${centerY}
        L ${x1},${y1}
        A ${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2}
        Z
      `}
      fill={color}
      opacity={opacity}
    />
  );
};

export default TimeBlockArc;
