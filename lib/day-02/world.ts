import { hslToRgb, rgbToCss } from "@/lib/day-02/hue";
import type { VertexId } from "@/lib/geometry/types";

export type Hues = { a: number; b: number; c: number };

export type ColorWorld = {
  hues: Hues;
  drag: VertexId | null;
  holding: boolean;
  holdFrom: number;
  solved: boolean;
};

export const TARGET_HUES: Hues = { a: 210, b: 8, c: 48 };
export const START_HUES: Hues = { a: 312, b: 168, c: 96 };

export const TARGET_CSS = {
  a: rgbToCss(hslToRgb(TARGET_HUES.a)),
  b: rgbToCss(hslToRgb(TARGET_HUES.b)),
  c: rgbToCss(hslToRgb(TARGET_HUES.c)),
};

export const TRIANGLE = {
  a: { x: 0.5, y: 0.16 },
  b: { x: 0.16, y: 0.84 },
  c: { x: 0.86, y: 0.8 },
};

export function cloneWorld(): ColorWorld {
  return {
    hues: { ...START_HUES },
    drag: null,
    holding: false,
    holdFrom: 0,
    solved: false,
  };
}
