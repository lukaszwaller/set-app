import React from "react";
import Card from "./Card";
import { CardType } from "./../gameLogic";

interface BoardProps {
  cards: CardType[];
  selectedCards: CardType[];
  onSelectCard: (card: CardType) => void;
}

const Board: React.FC<BoardProps> = ({ cards, selectedCards, onSelectCard }) => {

  return (
    <div className={"grid grid-cols-4 gap-4 p-6"}>
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
