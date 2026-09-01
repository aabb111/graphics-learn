import type { Vec2 } from "@/lib/geometry/types";

export type Trs = {
  cx: number;
  cy: number;
  rotation: number;
  scale: number;
};

export type TransformWorld = Trs & {
  holding: boolean;
  holdFrom: number;
  solved: boolean;
};

export const CANONICAL: Record<"a" | "b" | "c", Vec2> = {
  a: { x: 0, y: -0.42 },
  b: { x: -0.34, y: 0.24 },
  c: { x: 0.34, y: 0.2 },
};

export const GHOST: Trs = {
  cx: 0.58,
  cy: 0.52,
  rotation: -0.22,
  scale: 1.05,
};

export const SPAWN: Trs = {
  cx: 0.3,
  cy: 0.36,
  rotation: 0.58,
  scale: 0.66,
};

export const PLAY_FILL = "rgb(47, 79, 224)";
export const GHOST_FILL = "rgb(20 20 20 / 0.04)";
export const GHOST_STROKE = "rgb(20 20 20 / 0.22)";

export const VERTEX_R = 3;
export const VERTEX_HIT = 22;
export const ROTATE_R = 7;
export const ROTATE_STROKE = 2;
export const ROTATE_HIT = 22;
export const TOUCH_HIT = 22;

export const SCALE_MIN = 0.35;
export const SCALE_MAX = 1.85;

export function createWorld(): TransformWorld {
  return {
    ...SPAWN,
    holding: false,
    holdFrom: 0,
    solved: false,
  };
}

export function resetTransform(world: TransformWorld) {
  world.cx = SPAWN.cx;
  world.cy = SPAWN.cy;
  world.rotation = SPAWN.rotation;
  world.scale = SPAWN.scale;
  world.holding = false;
  world.holdFrom = 0;
  world.solved = false;
}

export function readTrs(world: TransformWorld): Trs {
  return {
    cx: world.cx,
    cy: world.cy,
    rotation: world.rotation,
    scale: world.scale,
  };
}
