import React from "react";

interface SquiggleProps {
    cardId: number;
    color: string;
    fill: string;
}

const Squiggle: React.FC<SquiggleProps> = ({ cardId, color, fill }) => {
    let patternId = fill;

    if (fill == "stripedPattern") {
        patternId = "stripedPattern" + cardId
        fill = "url(#" + patternId + ")"
    }

    if (fill == "currentColor") {
        fill = color
    }

    return (
        <svg className="w-12 h-6 sm:w-16 sm:h-8" version="1.0" xmlns="http://www.w3.org/2000/svg"
            width="229.000000pt" height="139.000000pt" viewBox="0 0 229.000000 139.000000"
            preserveAspectRatio="xMidYMid meet">
                <defs>
        <pattern
          id={patternId}
          patternUnits="userSpaceOnUse"
          width="300"
          height="15"
        >
          <rect width="130" height="15" fill={color} />
        </pattern>
      </defs>
            <g transform="translate(0.000000,139.000000) scale(0.100000,-0.100000)"
                fill={fill} stroke={color} strokeWidth="80">
                <path d="M2041 1106 c-6 -7 -29 -16 -51 -19 -25 -3 -93 -35 -173 -81 -155 -88
-189 -102 -303 -117 -128 -17 -183 -4 -464 104 -160 62 -266 81 -411 75 -104
-5 -124 -8 -184 -37 -137 -64 -247 -217 -300 -416 -6 -25 -9 -31 -23 -45 -11
-11 -13 -30 -9 -85 15 -180 93 -293 209 -302 48 -4 59 -1 118 36 181 114 290
154 420 154 78 0 95 -3 200 -45 153 -60 240 -79 390 -85 222 -9 377 46 515
183 85 84 131 168 166 304 36 142 14 295 -53 367 -25 27 -31 28 -47 9z"/>
            </g>
        </svg>
    );
};

export default Squiggle;
