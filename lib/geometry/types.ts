export type Vec2 = {
  x: number;
  y: number;
};

export type RGB = [number, number, number];

export type VertexColors = {
  a: RGB;
  b: RGB;
  c: RGB;
};

export type Barycentric = {
  alpha: number;
  beta: number;
  gamma: number;
  degenerate: boolean;
};

export type VertexId = "a" | "b" | "c";
