export interface ShapeProps {
  cardId: number;
  color: string;
  fill: string;
}

export function useShapeFill(cardId: number, color: string, fill: string) {
  let patternId = fill;

  if (fill === "stripedPattern") {
    patternId = "stripedPattern" + cardId;
    fill = "url(#" + patternId + ")";
  }

  if (fill === "currentColor") {
    fill = color;
  }

  return { fill, patternId };
}
