import type { DragTarget, Vec2 } from "@/lib/geometry/types";

export type World = {
  a: Vec2;
  b: Vec2;
  c: Vec2;
  probe: Vec2;
  pinned: boolean;
  drag: DragTarget | null;
  solved: boolean;
};

export const DEFAULT_WORLD: World = {
  a: { x: 0.5, y: 0.18 },
  b: { x: 0.18, y: 0.82 },
  c: { x: 0.84, y: 0.78 },
  probe: { x: 0.62, y: 0.46 },
  pinned: false,
  drag: null,
  solved: false,
};

export function cloneWorld(world: World = DEFAULT_WORLD): World {
  return {
    a: { ...world.a },
    b: { ...world.b },
    c: { ...world.c },
    probe: { ...world.probe },
    pinned: world.pinned,
    drag: world.drag,
    solved: world.solved,
  };
}

export function clampNorm(value: number, pad = 0.03) {
  return Math.min(1 - pad, Math.max(pad, value));
}
