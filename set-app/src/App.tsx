import React from "react";
import Board from "./components/Board";
import { useSetGame } from "./hooks/useSetGame";

const App: React.FC = () => {
  const { cards, remainingCards, selectedCards, handleCardSelection, resetGame, score } = useSetGame();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100">
      <div className="flex flex-col items-center">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 text-center">Set Game</h1>
          <p className="text-gray-700 font-bold text-center">Score: {score}</p>
          <p className="text-gray-700 font-bold text-center">Deck: {remainingCards}</p>
        </div>

        {/* Board */}
        <div className="flex-grow w-full flex items-center justify-center mb-6">
          <Board cards={cards} selectedCards={selectedCards} onSelectCard={handleCardSelection} />
        </div>

        {/* Buttons */}
        <div className="flex flex-row gap-8">
          <button
            className="bg-red-500 text-white py-2 w-32 rounded hover:bg-red-600"
            onClick={resetGame}
          >
            Reset Game
          </button>
          <button
            className="bg-gray-500 text-white py-2 w-32 rounded hover:bg-gray-600 cursor-not-allowed"
            onClick={resetGame}
          >
            New Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;

