import type { Vec2 } from "@/lib/geometry/types";

export const CELL = 48;
export const CENTER_R = 2;
export const VERTEX_R = 3;
export const FLASH_MS = 180;
export const WIN_BEAT_MS = 220;

export const TRI = {
  a: { x: 0.5, y: 0.18 } satisfies Vec2,
  b: { x: 0.18, y: 0.82 } satisfies Vec2,
  c: { x: 0.84, y: 0.78 } satisfies Vec2,
};

export type RasterWorld = {
  lit: boolean[];
  flashes: number[];
  holding: boolean;
  holdFrom: number;
  solved: boolean;
};

export function emptyFlags(count: number, fill = false) {
  return Array.from({ length: count }, () => fill);
}

export function emptyTimes(count: number) {
  return Array.from({ length: count }, () => 0);
}

export function createWorld(count: number): RasterWorld {
  return {
    lit: emptyFlags(count),
    flashes: emptyTimes(count),
    holding: false,
    holdFrom: 0,
    solved: false,
  };
}
