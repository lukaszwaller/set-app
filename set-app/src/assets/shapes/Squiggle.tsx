import React from "react";

interface SquiggleProps {
  color: string;
  fill: string;
}

const Squiggle: React.FC<SquiggleProps> = ({ color, fill }) => {
  return (
    <svg viewBox="0 0 100 65" className="w-12 h-6">
      <path
        d="M5,25
           C20,5 40,5 50,25
           C60,45 80,45 95,25
           V50
           C80,65 60,65 50,45
           C40,25 20,25 5,45
           Z"
        stroke={color}
        fill={fill}
        strokeWidth={4}
      />
    </svg>
  );
};

export default Squiggle;
