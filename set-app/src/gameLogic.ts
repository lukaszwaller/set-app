export interface CardType {
  id: number;
  color: "red" | "green" | "purple";
  shape: "oval" | "squiggle" | "diamond";
  shading: "solid" | "striped" | "outlined";
  number: number;
}

const COLORS = ["red", "green", "purple"] as const;
const SHAPES = ["oval", "squiggle", "diamond"] as const;
const SHADINGS = ["solid", "striped", "outlined"] as const;
const NUMBERS = [1, 2, 3] as const;

const shuffleArray = <T>(array: T[]): T[] => {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export const generateAllCards = (): CardType[] => {
  const allCards: CardType[] = [];
  let id = 1;

  for (const color of COLORS) {
    for (const shape of SHAPES) {
      for (const shading of SHADINGS) {
        for (const number of NUMBERS) {
          allCards.push({ id: id++, color, shape, shading, number });
        }
      }
    }
  }

  return shuffleArray(allCards);
};

const allSame = <T>(a: T, b: T, c: T) => a === b && b === c;
const allDistinct = <T>(a: T, b: T, c: T) => new Set([a, b, c]).size === 3;

export const isSet = (cards: CardType[]): boolean => {
  if (!Array.isArray(cards) || cards.length !== 3) return false;
  const [a, b, c] = cards;

  return (
    (allSame(a.color, b.color, c.color) || allDistinct(a.color, b.color, c.color)) &&
    (allSame(a.shape, b.shape, c.shape) || allDistinct(a.shape, b.shape, c.shape)) &&
    (allSame(a.shading, b.shading, c.shading) || allDistinct(a.shading, b.shading, c.shading)) &&
    (allSame(a.number, b.number, c.number) || allDistinct(a.number, b.number, c.number))
  );
};

export const getRandomCards = (
  cards: CardType[],
  count = 12
): { selected: CardType[]; remaining: CardType[] } => {
  const arr = cards.slice();
  const n = Math.min(Math.max(count, 0), arr.length);

  for (let i = 0; i < n; i++) {
    const j = i + Math.floor(Math.random() * (arr.length - i));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return { selected: arr.slice(0, n), remaining: arr.slice(n) };
};

export const findFirstSet = (board: CardType[]): CardType[] | null => {
  for (let i = 0; i < board.length; i++) {
    for (let j = i + 1; j < board.length; j++) {
      for (let k = j + 1; k < board.length; k++) {
        const triple = [board[i], board[j], board[k]];
        if (isSet(triple)) return triple;
      }
    }
  }
  return null;
};

export const hasSetOnBoard = (board: CardType[]): boolean => findFirstSet(board) !== null;
