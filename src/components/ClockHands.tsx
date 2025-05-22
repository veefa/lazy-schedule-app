type ClockHandProps = {
  angle: number;
  length: number;
  width: number;
  color: string;
  centerX: number;
  centerY: number;
};

const ClockHand: React.FC<ClockHandProps> = ({
  angle,
  length,
  width,
  color,
  centerX,
  centerY,
}) => {
  // Calculate the end point of the hand
  const rad = ((angle - 90) * Math.PI) / 180;
  const x2 = centerX + length * Math.cos(rad);
  const y2 = centerY + length * Math.sin(rad);

  return (
    <line
      x1={centerX}
      y1={centerY}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
    />
  );
};
export default ClockHand;