import { barycentric, isInside, toPx } from "@/lib/geometry/barycentric";
import type { Vec2 } from "@/lib/geometry/types";

import {
  DEPTH_GAP,
  SHAPE,
  TARGET,
  type DepthWorld,
  type TriId,
  type TriShape,
} from "@/lib/day-04/world";

export function toCss(shape: TriShape, width: number, height: number) {
  return {
    a: toPx(shape.a, width, height),
    b: toPx(shape.b, width, height),
    c: toPx(shape.c, width, height),
  };
}

export function contains(point: Vec2, shape: TriShape, width: number, height: number) {
  const css = toCss(shape, width, height);
  return isInside(barycentric(point, css.a, css.b, css.c), 1e-4);
}

export function frontOf(a: number, b: number): TriId | null {
  if (a - b > DEPTH_GAP) return "a";
  if (b - a > DEPTH_GAP) return "b";
  return null;
}

export function stackMatch(world: DepthWorld) {
  const play = frontOf(world.a, world.b);
  const goal = frontOf(TARGET.a, TARGET.b);
  return play !== null && play === goal;
}

export function hitFront(point: Vec2, world: DepthWorld, width: number, height: number) {
  const ids: TriId[] = world.a >= world.b ? ["a", "b"] : ["b", "a"];
  for (const id of ids) {
    if (contains(point, SHAPE[id], width, height)) return id;
  }
  return null;
}

export function clampDepth(value: number) {
  return Math.min(1, Math.max(0, value));
}
