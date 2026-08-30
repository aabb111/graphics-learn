import { spawnSample } from "@/lib/geometry/sample";
import type { Vec2 } from "@/lib/geometry/types";

export type World = {
  a: Vec2;
  b: Vec2;
  c: Vec2;
  sample: Vec2;
  dragging: boolean;
  holding: boolean;
  holdFrom: number;
  solved: boolean;
};

const A: Vec2 = { x: 0.5, y: 0.18 };
const B: Vec2 = { x: 0.18, y: 0.82 };
const C: Vec2 = { x: 0.84, y: 0.78 };

export const DEFAULT_WORLD: World = {
  a: A,
  b: B,
  c: C,
  sample: spawnSample(A, B, C),
  dragging: false,
  holding: false,
  holdFrom: 0,
  solved: false,
};

export function cloneWorld(world: World = DEFAULT_WORLD): World {
  return {
    a: { ...world.a },
    b: { ...world.b },
    c: { ...world.c },
    sample: { ...world.sample },
    dragging: world.dragging,
    holding: world.holding,
    holdFrom: world.holdFrom,
    solved: world.solved,
  };
}

export function centroidOf(a: Vec2, b: Vec2, c: Vec2): Vec2 {
  return {
    x: (a.x + b.x + c.x) / 3,
    y: (a.y + b.y + c.y) / 3,
  };
}
