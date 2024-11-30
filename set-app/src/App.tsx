import React from "react";
import Board from "./components/Board";
import { useSetGame } from "./hooks/useSetGame";

const App: React.FC = () => {
  const { cards, remainingCards, selectedCards, handleCardSelection, resetGame, score } = useSetGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 mt-4 sm:mt-8">Set Game</h1>
      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-gray-700 font-bold w-32 py-2 ml-24">Score: {score}</p>
          <p className="text-gray-700 font-bold w-32 py-2 ml-24">Deck: {remainingCards}</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <button
            className="bg-red-500 text-white py-2 w-32 rounded hover:bg-red-600"
            onClick={resetGame}
          >
            Reset Game
          </button>
          <button
            className="bg-blue-500 text-white py-2 w-32 rounded hover:bg-blue-600"
            onClick={resetGame}
          >
            New Card
          </button>
        </div>
      </div>


      <Board cards={cards} selectedCards={selectedCards} onSelectCard={handleCardSelection} />
    </div>
  );
};

export default App;
