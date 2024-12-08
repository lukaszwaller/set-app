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
    colors.forEach((color) => {
      shapes.forEach((shape) => {
        shadings.forEach((shading) => {
          numbers.forEach((number) => {
            allCards.push({ id: allCards.length + 1, color, shape, shading, number });
          });
        });
      });
    });
    return allCards;
  };
  
  export const isSet = (cards: CardType[]): boolean => {
    if (cards.length !== 3) return false;
  
    const properties = ["color", "shape", "shading", "number"] as const;
    return properties.every((prop) => {
      const values = cards.map((card) => card[prop]);
      return new Set(values).size === 1 || new Set(values).size === 3;
    });
  };
  
  export const getRandomCards = (cards: CardType[], count: number = 12): { selected: CardType[]; remaining: CardType[] } => {
    const shuffled = cards.sort(() => Math.random() - 0.5);
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
                    setsFound.push(potentialSet);
                }
            }
        }
    }

    return setsFound.length > 0 ? setsFound : null;
};