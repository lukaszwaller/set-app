import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CardType, generateAllCards, getRandomCards, isSet, findSetsOnBoard } from "./../gameLogic";

export const useSetGame = () => {
  const [deck, setDeck] = useState<CardType[]>([]);
  const [cards, setCards] = useState<CardType[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardType[]>([]);
  const [score, setScore] = useState<number>(0);

  const logPossibleSets = (board: CardType[]) => {
    const sets = findSetsOnBoard(board);
    if (sets) {
      console.log("Sets:", sets);
    } else {
      console.log("No sets on the board.");
    }
  };

  const initializeGame = () => {
    const fullDeck = generateAllCards();
    let initialCards: CardType[] = [];
    let remainingDeck: CardType[] = fullDeck;

    do {
      const result = getRandomCards(fullDeck, 12);
      initialCards = result.selected;
      remainingDeck = result.remaining;
    } while (!findSetsOnBoard(initialCards));

    setDeck(remainingDeck);
    setCards(initialCards);
    setSelectedCards([]);
    setScore(0);

    logPossibleSets(initialCards);
  };

  const drawAndValidateNewCards = (currentBoard: CardType[]) => {
    while (deck.length > 0) {
      if (findSetsOnBoard(currentBoard)) {
        logPossibleSets(currentBoard);
        return;
      }

      const { selected: newCards, remaining: updatedDeck } = getRandomCards(deck, 3);
      setDeck(updatedDeck);
      setCards([...currentBoard, ...newCards]);
    }
    toast.success("No more sets can be formed. Congratulations! 🏆");
  };

  const handleCardSelection = (card: CardType) => {
    const isAlreadySelected = selectedCards.some(c => c.id === card.id);
    const newSelectedCards = isAlreadySelected
      ? selectedCards.filter(c => c.id !== card.id)
      : [...selectedCards, card];

    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 3) {
      if (isSet(newSelectedCards)) {
        setScore(prev => prev + 1);

        setCards(prevCards => {
          const updatedBoard = replaceCardsInPlace(prevCards, newSelectedCards);
          drawAndValidateNewCards(updatedBoard);
          return updatedBoard;
        });
      }
      setSelectedCards([]);
    }
  };

  const replaceCardsInPlace = (board: CardType[], selectedCards: CardType[]): CardType[] => {
    const indicesToReplace = board
      .map((card, index) => (selectedCards.includes(card) ? index : -1))
      .filter(index => index !== -1);

    const { selected: newCards, remaining: updatedDeck } = getRandomCards(
      deck,
      indicesToReplace.length
    );

    setDeck(updatedDeck);

    const newBoard = [...board];
    indicesToReplace.forEach((index, i) => {
      if (newCards[i]) {
        newBoard[index] = newCards[i];
      } else {
        newBoard[index] = null as any;
      }
    });

    return newBoard.filter(card => card);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  return {
    score,
    cards,
    remainingCards: deck.length,
    selectedCards,
    handleCardSelection,
    resetGame: initializeGame,
  };
};
