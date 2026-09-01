import type { Vec2 } from "@/lib/geometry/types";

import {
  CANONICAL,
  ROTATE_OUTSET,
  SCALE_MAX,
  SCALE_MIN,
  type Trs,
} from "@/lib/day-05/world";

export type TriangleVerts = {
  a: Vec2;
  b: Vec2;
  c: Vec2;
};

export function wrapAngle(angle: number) {
  let next = angle;
  while (next > Math.PI) next -= Math.PI * 2;
  while (next < -Math.PI) next += Math.PI * 2;
  return next;
}

export function unitOf(width: number, height: number) {
  return Math.min(width, height);
}

export function applyPoint(local: Vec2, trs: Trs, width: number, height: number): Vec2 {
  const unit = unitOf(width, height);
  const x = local.x * trs.scale * unit;
  const y = local.y * trs.scale * unit;
  const cos = Math.cos(trs.rotation);
  const sin = Math.sin(trs.rotation);
  return {
    x: trs.cx * width + cos * x - sin * y,
    y: trs.cy * height + sin * x + cos * y,
  };
}

export function vertsOf(trs: Trs, width: number, height: number): TriangleVerts {
  return {
    a: applyPoint(CANONICAL.a, trs, width, height),
    b: applyPoint(CANONICAL.b, trs, width, height),
    c: applyPoint(CANONICAL.c, trs, width, height),
  };
}

export function centroidPx(trs: Trs, width: number, height: number): Vec2 {
  return { x: trs.cx * width, y: trs.cy * height };
}

const EDGES: Array<[keyof TriangleVerts, keyof TriangleVerts, keyof TriangleVerts]> = [
  ["a", "b", "c"],
  ["b", "c", "a"],
  ["c", "a", "b"],
];

export function rotateHandlesOf(verts: TriangleVerts): Vec2[] {
  return EDGES.map(([fromId, toId, otherId]) => {
    const from = verts[fromId];
    const to = verts[toId];
    const other = verts[otherId];
    const mid = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 };
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const len = Math.hypot(dx, dy) || 1;
    let nx = -dy / len;
    let ny = dx / len;
    if (nx * (other.x - mid.x) + ny * (other.y - mid.y) > 0) {
      nx = -nx;
      ny = -ny;
    }
    return { x: mid.x + nx * ROTATE_OUTSET, y: mid.y + ny * ROTATE_OUTSET };
  });
}

export function clampScale(value: number) {
  return Math.min(SCALE_MAX, Math.max(SCALE_MIN, value));
}

export function clampCenter(value: number) {
  return Math.min(0.92, Math.max(0.08, value));
}
