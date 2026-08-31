import { VERTEX_HEX } from "@/lib/geometry/colors";
import type { Vec2 } from "@/lib/geometry/types";

export type TriId = "a" | "b";

export type TriShape = {
  a: Vec2;
  b: Vec2;
  c: Vec2;
};

export const SHAPE: Record<TriId, TriShape> = {
  a: {
    a: { x: 0.3, y: 0.18 },
    b: { x: 0.1, y: 0.8 },
    c: { x: 0.56, y: 0.74 },
  },
  b: {
    a: { x: 0.7, y: 0.16 },
    b: { x: 0.44, y: 0.78 },
    c: { x: 0.9, y: 0.72 },
  },
};

export const FILL: Record<TriId, string> = {
  a: VERTEX_HEX.a,
  b: VERTEX_HEX.b,
};

export const SPAWN = { a: 0.72, b: 0.28 };
export const TARGET = { a: 0.28, b: 0.72 };
export const DEPTH_GAP = 0.06;

export type DepthWorld = {
  a: number;
  b: number;
  holding: boolean;
  holdFrom: number;
  solved: boolean;
};

export function createWorld(): DepthWorld {
  return {
    a: SPAWN.a,
    b: SPAWN.b,
    holding: false,
    holdFrom: 0,
    solved: false,
  };
}

export function resetDepths(world: DepthWorld) {
  world.a = SPAWN.a;
  world.b = SPAWN.b;
  world.holding = false;
  world.holdFrom = 0;
  world.solved = false;
}
