import React from "react";

interface DiamondProps {
    color: string;
    fill: string;
}

const Diamond: React.FC<DiamondProps> = ({ color, fill }) => {
    return (
        <svg viewBox="0 0 100 60" className="w-12 h-8">
      <polygon points="50,0 100,30 50,60 0,30" fill={fill} stroke={color} strokeWidth="4" />
    </svg>
    );
};

export default Diamond;
