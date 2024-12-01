import React from "react";
import { ToastContainer } from 'react-toastify';
import Board from "./components/Board";
import { useSetGame } from "./hooks/useSetGame";

const App: React.FC = () => {
  // const { score, cards, columns, remainingCards, selectedCards, handleCardSelection, resetGame, addCard } = useSetGame(); -> debug button
  const { score, cards, columns, remainingCards, selectedCards, handleCardSelection, resetGame } = useSetGame();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100">
      <div className="flex flex-col items-center">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 text-center">Set Game</h1>
          <p className="text-gray-700 font-bold text-center">Score: {score}</p>
          <p className="text-gray-700 font-bold text-center">Deck: {remainingCards}</p>
        </div>
        <div className="flex-grow w-full flex items-center justify-center mb-6">
          <Board cards={cards} selectedCards={selectedCards} columns={columns} onSelectCard={handleCardSelection} />
        </div>
        <div className="flex flex-row gap-8">
          <button
            className="bg-red-500 text-white py-2 w-32 rounded hover:bg-red-600"
            onClick={resetGame}
          >
            Reset Game
          </button>
          {/* <button
            className="bg-blue-500 text-white py-2 w-32 rounded hover:bg-blue-600"
            onClick={addCard}
          >
            New Card
          </button> */}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;

