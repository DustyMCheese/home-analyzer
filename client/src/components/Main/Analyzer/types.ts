interface Coordinates {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface Furniture {
  box: Coordinates;
  name: string;
  class: number;
  confidence: number;
}
