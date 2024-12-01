import React from "react";
import clsx from "clsx";
import Card from "./Card";
import { CardType } from "./../gameLogic";

interface BoardProps {
  cards: CardType[];
  selectedCards: CardType[];
  columns: Number;
  onSelectCard: (card: CardType) => void;
}

const Board: React.FC<BoardProps> = ({ cards, selectedCards, columns, onSelectCard }) => {
  const gridClass = clsx("grid", {
    "grid-cols-3": columns === 3,
    "grid-cols-4": columns === 4,
    "grid-cols-5": columns === 5,
  });

  return (
    <div className={`${gridClass} gap-4 p-6`}>
      {cards.map((card) => (
        <Card
          key={card.id}
          cardId={card.id}
          color={card.color}
          shape={card.shape}
          shading={card.shading}
          number={card.number}
          isSelected={selectedCards.some((c) => c.id === card.id)}
          onClick={() => onSelectCard(card)}
        />
      ))}
    </div>
  );
};

export default Board;
