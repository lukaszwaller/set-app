import { useState, useEffect } from "react";
import { CardType, generateAllCards, getRandomCards, isSet } from "./../gameLogic";

export const useSetGame = () => {
    const fullDeck = generateAllCards();
    const { selected: initialCards, remaining: initialDeck } = getRandomCards(fullDeck, 12);

    const [deck, setDeck] = useState<CardType[]>(initialDeck);
    const [cards, setCards] = useState<CardType[]>(initialCards);
    const [selectedCards, setSelectedCards] = useState<CardType[]>([]);
    const [score, setScore] = useState<number>(0);
    const [columns, setColumns] = useState<number>(4);

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
            addCard();
        }
    };

    const addCard = () => {
        if (deck.length > 0) {
            const { selected: newCards, remaining: updatedDeck } = getRandomCards(deck, 1);

            setDeck(updatedDeck);
            setCards((prevCards) => [...prevCards, ...newCards]);

            const newColumnCount = Math.ceil((cards.length + 1) / 3);

            if (newColumnCount > columns) {
                setColumns(newColumnCount);
            }
        } else {
            console.log("The game is finished!")
        }
    }

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

                    const maxCards = 12;
                    const cardsToFill = Math.max(0, maxCards - remainingCards.length);

                    const { selected: newCards, remaining: updatedDeck } = getRandomCards(deck, cardsToFill);

                    setDeck(updatedDeck);
                    setColumns(4);

                    return remainingCards.length + newCards.length > maxCards
                        ? remainingCards.slice(0, maxCards - newCards.length).concat(newCards)
                        : [...remainingCards, ...newCards];
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
        setColumns(4);
    };

    let remainingCards = deck.length;

    // return { score, cards, columns, remainingCards, selectedCards, handleCardSelection, resetGame, addCard }; -> debug button
    return { score, cards, columns, remainingCards, selectedCards, handleCardSelection, resetGame };
};
