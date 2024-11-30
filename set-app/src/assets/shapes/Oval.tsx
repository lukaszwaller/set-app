import React from "react";

interface OvalProps {
    cardId: number;
    color: string;
    fill: string;
}

const Oval: React.FC<OvalProps> = ({ cardId, color, fill }) => {
    let patternId = fill;

    if (fill == "stripedPattern") {
        patternId = "stripedPattern" + cardId
        fill = "url(#" + patternId + ")"
    }

    if (fill == "currentColor") {
        fill = color
    }

    return (
        <svg
            className="w-10 h-6 sm:w-14 sm:h-8"
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="300.000000pt"
            height="171.000000pt"
            viewBox="0 0 300.000000 171.000000"
            preserveAspectRatio="xMidYMid meet"
        >
            <defs>
                <pattern
                    id={patternId}
                    patternUnits="userSpaceOnUse"
                    width="350"
                    height="15"
                >
                    <rect width="150" height="15" fill={color} />
                </pattern>
            </defs>
            <g
                transform="translate(0.000000,171.000000) scale(0.100000,-0.100000)"
                fill={fill}
                stroke={color}
                strokeWidth={100}
            >
                <path
                    d="M740 1489 c-118 -18 -135 -22 -150 -34 -8 -7 -28 -15 -44 -19 -17 -4
          -46 -21 -67 -37 -20 -16 -43 -29 -51 -29 -22 0 -143 -123 -165 -170 -7 -14
          -17 -33 -23 -42 -38 -65 -30 -45 -71 -203 -16 -62 -7 -235 14 -265 9 -13 17
          -37 17 -52 0 -15 4 -29 9 -33 5 -3 12 -19 16 -35 4 -17 11 -30 16 -30 5 0 15
          -15 23 -33 19 -46 178 -207 204 -207 11 0 22 -7 26 -15 3 -9 18 -15 35 -15 20
          0 30 -6 34 -20 4 -16 14 -20 44 -20 21 0 45 -6 52 -13 18 -18 1634 -18 1653 1
          6 6 29 12 50 12 27 0 40 5 48 20 6 11 21 20 34 20 13 0 29 7 36 15 7 8 21 15
          32 15 10 0 21 7 24 15 4 8 13 15 20 15 8 0 17 7 21 16 3 9 35 44 69 78 35 33
          64 66 64 72 0 6 9 23 20 37 11 14 20 34 20 45 0 11 7 22 15 26 9 3 15 18 15
          35 0 16 6 31 13 33 20 7 23 289 3 330 -9 17 -16 44 -16 59 0 15 -4 31 -10 34
          -13 8 -60 103 -60 121 0 8 -7 17 -16 21 -17 6 -84 70 -84 79 0 15 -47 54 -66
          54 -11 0 -33 13 -50 29 -16 15 -45 32 -64 36 -19 4 -41 12 -49 19 -46 37 -86
          39 -846 41 -407 2 -765 -1 -795 -6z"
                />
            </g>
        </svg>
    );
};

export default Oval;
