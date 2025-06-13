export interface CardType {
  id: number;
  color: "red" | "green" | "purple";
  shape: "oval" | "squiggle" | "diamond";
  shading: "solid" | "striped" | "outlined";
  number: number;
}

export const generateAllCards = (): CardType[] => {
  const colors: CardType["color"][] = ["red", "green", "purple"];
  const shapes: CardType["shape"][] = ["oval", "squiggle", "diamond"];
  const shadings: CardType["shading"][] = ["solid", "striped", "outlined"];
  const numbers: CardType["number"][] = [1, 2, 3];

  const allCards: CardType[] = [];
  let id = 1;
  colors.forEach((color) => {
    shapes.forEach((shape) => {
      shadings.forEach((shading) => {
        numbers.forEach((number) => {
          allCards.push({ id: id++, color, shape, shading, number });
        });
      });
    });
  });
  return allCards;
};

export const isSet = (cards: CardType[]): boolean => {
  if (!Array.isArray(cards) || cards.length !== 3) return false;

  const properties = ["color", "shape", "shading", "number"] as const;
  return properties.every((prop) => {
    const values = cards.map((card) => card[prop]);
    const unique = new Set(values);
    return unique.size === 1 || unique.size === 3;
  });
};

const shuffleArray = <T>(array: T[]): T[] => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export const getRandomCards = (
  cards: CardType[],
  count: number = 12
): { selected: CardType[]; remaining: CardType[] } => {
  const shuffled = shuffleArray(cards);
  const selected = shuffled.slice(0, count);
  const remaining = shuffled.slice(count);
  return { selected, remaining };
};

export const findSetsOnBoard = (board: CardType[]): CardType[][] | null => {
  const setsFound: CardType[][] = [];

  for (let i = 0; i < board.length; i++) {
    for (let j = i + 1; j < board.length; j++) {
      for (let k = j + 1; k < board.length; k++) {
        const potentialSet = [board[i], board[j], board[k]];
        if (isSet(potentialSet)) {
          const clonedSet = potentialSet.map(card => ({ ...card }));
          setsFound.push(clonedSet);
        }
      }
    }
  }

  return setsFound.length > 0 ? setsFound : null;
};

