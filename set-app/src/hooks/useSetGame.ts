import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CardType, generateAllCards, getRandomCards, isSet, hasSetOnBoard } from "./../gameLogic";

export const useSetGame = () => {
  const [deck, setDeck] = useState<CardType[]>([]);
  const [cards, setCards] = useState<CardType[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardType[]>([]);
  const [score, setScore] = useState<number>(0);

  const initializeGame = useCallback(() => {
    const fullDeck = generateAllCards();
    let initialCards: CardType[] = [];
    let remainingDeck: CardType[] = fullDeck;

    let attempts = 0;
    do {
      const { selected, remaining } = getRandomCards(fullDeck, 12);
      initialCards = selected;
      remainingDeck = remaining;
      attempts++;
      if (attempts > 200) break;
    } while (!hasSetOnBoard(initialCards));

    setDeck(remainingDeck);
    setCards(initialCards);
    setSelectedCards([]);
    setScore(0);
  }, []);

  const replaceSelectedWithNewEnsuringSet = useCallback(
    (
      board: CardType[],
      fromDeck: CardType[],
      selected: CardType[]
    ): { board: CardType[]; deck: CardType[] } => {
      if (selected.length !== 3) return { board, deck: fromDeck };

      const selectedIds = new Set(selected.map(s => s.id));
      const indicesToReplace = board
        .map((card, idx) => (selectedIds.has(card.id) ? idx : -1))
        .filter(i => i !== -1)
        .sort((a, b) => a - b) as number[];

      const shuffle = (arr: CardType[]) => {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
      };

      let d = fromDeck.slice();

      if (d.length < indicesToReplace.length) {
        const need = indicesToReplace.length;
        const take = Math.min(need, d.length);
        const { selected: drawn, remaining } = getRandomCards(d, take);

        const next = board.slice();
        for (let i = 0; i < take; i++) {
          next[indicesToReplace[i]] = drawn[i];
        }

        for (let i = indicesToReplace.length - 1; i >= take; i--) {
          next.splice(indicesToReplace[i], 1);
        }

        return { board: next, deck: remaining };
      }

      let attempts = 0;
      while (d.length >= indicesToReplace.length && attempts < 1000) {
        const { selected: drawn, remaining } = getRandomCards(d, indicesToReplace.length);

        const candidate = board.slice();
        for (let i = 0; i < indicesToReplace.length; i++) {
          candidate[indicesToReplace[i]] = drawn[i];
        }

        if (hasSetOnBoard(candidate)) {
          return { board: candidate, deck: remaining };
        }

        d = shuffle([...remaining, ...drawn]);
        attempts++;
      }

      return { board, deck: d };
    },
    []
  );

  const handleCardSelection = useCallback(
    (card: CardType) => {
      const isAlreadySelected = selectedCards.some(c => c.id === card.id);
      const newSelected = isAlreadySelected
        ? selectedCards.filter(c => c.id !== card.id)
        : [...selectedCards, card];

      setSelectedCards(newSelected);

      if (newSelected.length === 3) {
        if (isSet(newSelected)) {
          setScore(prev => prev + 1);

          const { board: nextBoard, deck: nextDeck } = replaceSelectedWithNewEnsuringSet(
            cards,
            deck,
            newSelected
          );

          setDeck(nextDeck);
          setCards(nextBoard);

          if (nextDeck.length === 0 && !hasSetOnBoard(nextBoard)) {
            toast.success("No more sets can be formed. Congratulations! 🏆");
          }
        }

        setSelectedCards([]);
      }
    },
    [cards, deck, selectedCards, replaceSelectedWithNewEnsuringSet]
  );

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  return {
    score,
    cards,
    remainingCards: deck.length,
    selectedCards,
    handleCardSelection,
    resetGame: initializeGame,
  };
};
