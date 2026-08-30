import type { Vec2, VertexId } from "@/lib/geometry/types";

export type World = {
  a: Vec2;
  b: Vec2;
  c: Vec2;
  drag: VertexId | null;
  moved: boolean;
  holding: boolean;
  holdFrom: number;
  solved: boolean;
};

export const DEFAULT_WORLD: World = {
  a: { x: 0.5, y: 0.18 },
  b: { x: 0.18, y: 0.82 },
  c: { x: 0.84, y: 0.78 },
  drag: null,
  moved: false,
  holding: false,
  holdFrom: 0,
  solved: false,
};

export function cloneWorld(world: World = DEFAULT_WORLD): World {
  return {
    a: { ...world.a },
    b: { ...world.b },
    c: { ...world.c },
    drag: world.drag,
    moved: world.moved,
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

export function clampNorm(value: number, pad = 0.03) {
  return Math.min(1 - pad, Math.max(pad, value));
}
