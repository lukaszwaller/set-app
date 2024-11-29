import React, { useState } from "react";
import Card from "./Card";

interface CardType {
  id: number;
  color: "red" | "green" | "purple";
  shape: "oval" | "squiggle" | "diamond";
  shading: "solid" | "striped" | "outlined";
  number: number;
}

interface BoardProps {
  cards: CardType[];
  onSelectCard: (card: CardType) => void;
}

const Board: React.FC<BoardProps> = ({ cards, onSelectCard }) => {
  const [selectedCards, setSelectedCards] = useState<CardType[]>([]);

  const handleCardClick = (card: CardType) => {
    const isAlreadySelected = selectedCards.some((c) => c.id === card.id);
    const newSelectedCards = isAlreadySelected
      ? selectedCards.filter((c) => c.id !== card.id)
      : [...selectedCards, card];

    setSelectedCards(newSelectedCards);
    onSelectCard(card);
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-6">
      {cards.map((card) => (
        <Card
          key={card.id}
          color={card.color}
          shape={card.shape}
          shading={card.shading}
          number={card.number}
          onClick={() => handleCardClick(card)}
        />
      ))}
    </div>
  );
};

export default Board;
