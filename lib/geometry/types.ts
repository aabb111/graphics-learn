export type Vec2 = {
  x: number;
  y: number;
};

export type RGB = [number, number, number];

export type Barycentric = {
  alpha: number;
  beta: number;
  gamma: number;
  degenerate: boolean;
};

export type DragTarget = "a" | "b" | "c" | "probe";

export type VertexId = "a" | "b" | "c";
