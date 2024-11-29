import { useState, useEffect } from "react";
import { CardType, generateAllCards, getRandomCards, isSet } from "./../gameLogic";

export const useSetGame = () => {
  const fullDeck = generateAllCards();
  const { selected: initialCards, remaining: initialDeck } = getRandomCards(fullDeck, 12);

  const [deck, setDeck] = useState<CardType[]>(initialDeck);
  const [cards, setCards] = useState<CardType[]>(initialCards);
  const [selectedCards, setSelectedCards] = useState<CardType[]>([]);
  const [score, setScore] = useState<number>(0);

  const logSetsInDisplayedCards = () => {
    const setsFound: CardType[][] = [];

    for (let i = 0; i < cards.length; i++) {
      for (let j = i + 1; j < cards.length; j++) {
        for (let k = j + 1; k < cards.length; k++) {
          const potentialSet = [cards[i], cards[j], cards[k]];
          if (isSet(potentialSet)) {
            setsFound.push(potentialSet);
          }
        }
      }
    }

    if (setsFound.length > 0) {
      console.log(`Sets found:`, setsFound);
    } else {
      console.log("No sets found in the displayed cards.");
    }
  };

  useEffect(() => {
    logSetsInDisplayedCards();
  }, [cards]);

  const handleCardSelection = (card: CardType) => {
    const isAlreadySelected = selectedCards.some((c) => c.id === card.id);
    const newSelectedCards = isAlreadySelected
      ? selectedCards.filter((c) => c.id !== card.id)
      : [...selectedCards, card];

    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 3) {
      if (isSet(newSelectedCards)) {
        setScore((prev) => prev + 1);

        setCards((prevCards) => {
          const remainingCards = prevCards.filter((c) => !newSelectedCards.includes(c));
          const { selected: newCards, remaining: updatedDeck } = getRandomCards(deck, 3);

          setDeck(updatedDeck);

          return [...remainingCards, ...newCards];
        });
      }
      setSelectedCards([]);
    }
  };

  const resetGame = () => {
    const fullDeck = generateAllCards();
    const { selected, remaining } = getRandomCards(fullDeck, 12);

    setDeck(remaining);
    setCards(selected);
    setSelectedCards([]);
    setScore(0);
  };

  let remainingCards = deck.length;

  return { cards, remainingCards, selectedCards, score, handleCardSelection, resetGame };
};
