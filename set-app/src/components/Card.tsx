import React from "react";
import Oval from "../assets/shapes/Oval";
import Squiggle from "../assets/shapes/Squiggle";
import Diamond from "../assets/shapes/Diamond";

interface CardProps {
  color: "red" | "green" | "purple";
  shape: "oval" | "squiggle" | "diamond";
  shading: "solid" | "striped" | "outlined";
  number: number;
  onClick?: () => void;
}

const shapeComponents = {
  oval: Oval,
  squiggle: Squiggle,
  diamond: Diamond,
};

const shadingProps = {
  solid: { fill: "currentColor" },
  striped: { fill: "transparent" },
  outlined: { fill: "transparent" },
};

const Card: React.FC<CardProps> = ({ color, shape, shading, number, onClick }) => {
  const colorClasses = {
    red: "text-red-500 border-gray",
    green: "text-green-500 border-gray",
    purple: "text-purple-500 border-gray",
  };

  const ShapeComponent = shapeComponents[shape];
  const cardSize = "w-24 h-40";

  return (
    <div
      className={`flex flex-col justify-center items-center ${cardSize} border-2 rounded-lg cursor-pointer shadow-md hover:shadow-xl hover:scale-105 transition-all ease-in-out duration-200 ${colorClasses[color]} bg-white`}
      onClick={onClick}
    >
      {[...Array(number)].map((_, index) => {
        const { fill } = shadingProps[shading];
        return (
          <div key={index} className="m-2">
            <ShapeComponent color={color} fill={fill} />
          </div>
        );
      })}
    </div>
  );
};

export default Card;
