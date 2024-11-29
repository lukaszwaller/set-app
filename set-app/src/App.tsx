import React, { useState } from "react";
import Board from "./components/Board";

interface CardType {
  id: number;
  color: "red" | "green" | "purple";
  shape: "oval" | "squiggle" | "diamond";
  shading: "solid" | "striped" | "outlined";
  number: number;
}

const App: React.FC = () => {
  const generateRandomCards = (): CardType[] => {
    const colors: CardType["color"][] = ["red", "green", "purple"];
    const shapes: CardType["shape"][] = ["oval", "squiggle", "diamond"];
    const shadings: CardType["shading"][] = ["solid", "striped", "outlined"];
    const numbers: CardType["number"][] = [1, 2, 3];

    const allCards: CardType[] = [];
    colors.forEach((color) => {
      shapes.forEach((shape) => {
        shadings.forEach((shading) => {
          numbers.forEach((number) => {
            allCards.push({ id: allCards.length + 1, color, shape, shading, number });
          });
        });
      });
    });

    const shuffledCards = allCards.sort(() => 0.5 - Math.random());
    return shuffledCards.slice(0, 12);
  };

  const [cards, setCards] = useState<CardType[]>(generateRandomCards());

  const handleCardSelection = (selectedCard: CardType) => {
    console.log("Selected Card:", selectedCard);
    // Game Logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 mt-8">Set Game</h1>
      <Board cards={cards} onSelectCard={handleCardSelection} />
      <button
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={() => setCards(generateRandomCards())}
      >
        Regenerate Cards
      </button>
    </div>
  );
};

export default App;
