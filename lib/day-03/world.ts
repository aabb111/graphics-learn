import type { Vec2 } from "@/lib/geometry/types";

export const CELL = 48;
export const CENTER_DIAMETER = 4;
export const CENTER_R = CENTER_DIAMETER / 2;
export const VERTEX_R = 3;
export const TWEEN_MS = 80;

export const TRI = {
  a: { x: 0.5, y: 0.18 } satisfies Vec2,
  b: { x: 0.18, y: 0.82 } satisfies Vec2,
  c: { x: 0.84, y: 0.78 } satisfies Vec2,
};

export type RasterWorld = {
  lit: boolean[];
  from: number[];
  started: number[];
  holding: boolean;
  holdFrom: number;
  solved: boolean;
};

export function emptyFlags(count: number) {
  return Array.from({ length: count }, () => false);
}

export function emptyLevels(count: number) {
  return Array.from({ length: count }, () => 0);
}

export function createWorld(count: number): RasterWorld {
  return {
    lit: emptyFlags(count),
    from: emptyLevels(count),
    started: emptyLevels(count),
    holding: false,
    holdFrom: 0,
    solved: false,
  };
}

export function lightAt(
  world: RasterWorld,
  i: number,
  now: number,
  reduced: boolean,
) {
  const to = world.lit[i] ? 1 : 0;
  if (reduced || !world.started[i]) return to;
  const t = Math.min(1, (now - world.started[i]) / TWEEN_MS);
  return world.from[i] + (to - world.from[i]) * t;
}

export function stillTweening(world: RasterWorld, now: number, reduced: boolean) {
  if (reduced) return false;
  return world.started.some((start, i) => {
    if (!start) return false;
    return now - start < TWEEN_MS && lightAt(world, i, now, false) !== (world.lit[i] ? 1 : 0);
  });
}
