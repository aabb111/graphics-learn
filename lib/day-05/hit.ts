import { barycentric, isInside } from "@/lib/geometry/barycentric";
import { hitPoint } from "@/lib/geometry/hit";
import type { Vec2, VertexId } from "@/lib/geometry/types";

import {
  rotateHandleOf,
  type TriangleVerts,
} from "@/lib/day-05/transform";
import { ROTATE_HIT, VERTEX_HIT } from "@/lib/day-05/world";

export type DragKind =
  | { kind: "scale"; id: VertexId }
  | { kind: "rotate" }
  | { kind: "body" };

const CORNERS: VertexId[] = ["a", "b", "c"];

export function hitCorner(
  point: Vec2,
  verts: TriangleVerts,
  radius: number,
): VertexId | null {
  let best: VertexId | null = null;
  let bestD = radius;
  for (const id of CORNERS) {
    const distance = Math.hypot(point.x - verts[id].x, point.y - verts[id].y);
    if (distance <= bestD) {
      best = id;
      bestD = distance;
    }
  }
  return best;
}

export function pickHit(
  point: Vec2,
  verts: TriangleVerts,
  vertexHit = VERTEX_HIT,
  rotateHit = ROTATE_HIT,
): DragKind | null {
  const corner = hitCorner(point, verts, vertexHit);
  if (corner) return { kind: "scale", id: corner };
  if (hitPoint(point, rotateHandleOf(verts), rotateHit)) {
    return { kind: "rotate" };
  }
  if (isInside(barycentric(point, verts.a, verts.b, verts.c), 1e-4)) {
    return { kind: "body" };
  }
  return null;
}
