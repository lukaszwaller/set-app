import React, { useMemo } from "react";
import Oval from "../assets/shapes/Oval";
import Squiggle from "../assets/shapes/Squiggle";
import Diamond from "../assets/shapes/Diamond";

interface CardProps {
  cardId: number;
  color: "red" | "green" | "purple";
  shape: "oval" | "squiggle" | "diamond";
  shading: "solid" | "striped" | "outlined";
  number: number;
  isSelected: boolean;
  onClick?: () => void;
}

const shapeComponents = {
  oval: Oval,
  squiggle: Squiggle,
  diamond: Diamond,
};

const shadingProps = {
  solid: { fill: "currentColor" },
  striped: { fill: "stripedPattern" },
  outlined: { fill: "transparent" },
};

const Card: React.FC<CardProps> = ({
  cardId,
  color,
  shape,
  shading,
  number,
  isSelected,
  onClick,
}) => {
  const borderColor = isSelected ? "border-blue-500" : "border-gray-300";
  const scale = isSelected ? "scale-105" : "hover:scale-105";
  const cardSize = "w-16 h-28 sm:w-24 sm:h-40";

  const colorClass = useMemo(() => {
    const colorClasses = {
      red: "text-red-500",
      green: "text-green-500",
      purple: "text-purple-500",
    };
    return colorClasses[color];
  }, [color]);

  const ShapeComponent = useMemo(() => shapeComponents[shape], [shape]);
  const fill = useMemo(() => shadingProps[shading].fill, [shading]);

  return (
    <div
      className={`flex flex-col justify-center items-center ${cardSize} border-2 ${borderColor} rounded-lg cursor-pointer shadow-md hover:shadow-xl ${scale} transition-all ease-in-out duration-200 ${colorClass} bg-white`}
      onClick={onClick}
    >
      {Array.from({ length: number }).map((_, index) => (
        <div key={index}>
          <ShapeComponent color={color} fill={fill} cardId={cardId} />
        </div>
      ))}
    </div>
  );
};

export default Card;
