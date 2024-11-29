import React from "react";
import Board from "./components/Board";
import { useSetGame } from "./hooks/useSetGame";

const App: React.FC = () => {
  const { cards, remainingCards, selectedCards, handleCardSelection, resetGame, score } = useSetGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 mt-8">Set Game</h1>
      <p className="mb-4 text-gray-700">Score: {score}</p>
      <p className="mb-4 text-gray-700">Remaining Cards: {remainingCards}</p>
      <Board cards={cards} selectedCards={selectedCards} onSelectCard={handleCardSelection} />
      <button
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
};

export default App;
