import React from "react";

interface DiamondProps {
    cardId: number;
    color: string;
    fill: string;
}

const Diamond: React.FC<DiamondProps> = ({ cardId, color, fill }) => {
    let patternId = fill;

    if (fill == "stripedPattern") {
        patternId = "stripedPattern" + cardId
        fill = "url(#" + patternId + ")"
    }

    if (fill == "currentColor") {
        fill = color
    }

    return (
        <svg viewBox="0 0 130 60" className="w-10 h-6 mt-1 sm:w-14 sm:h-8">
            <defs>
                <pattern
                    id={patternId}
                    patternUnits="userSpaceOnUse"
                    width="15"
                    height="15"
                >
                    <rect width="7" height="15" fill={color} />
                </pattern>
            </defs>
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
