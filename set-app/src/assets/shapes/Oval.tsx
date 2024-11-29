import React from "react";

interface OvalProps {
  color: string;
  fill: string;
}

const Oval: React.FC<OvalProps> = ({ color, fill }) => {
  return (
    <svg viewBox="0 0 150 60" className="w-16 h-8">
      <ellipse cx="75" cy="30" rx="60" ry="20" stroke={color} fill={fill} strokeWidth="4" />
    </svg>
  );
};

export default Oval;

