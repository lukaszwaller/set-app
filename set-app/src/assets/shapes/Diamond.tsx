import React from "react";

interface DiamondProps {
    color: string;
    fill: string;
}

const Diamond: React.FC<DiamondProps> = ({ color, fill }) => {
    return (
        <svg viewBox="0 0 130 60" className="w-14 h-8">
            <polygon 
                points="65,0 130,30 65,60 0,30" 
                fill={fill} 
                stroke={color} 
                strokeWidth="4" 
            />
        </svg>
    );
};

export default Diamond;
