import { TRIANGLE } from "@/lib/day-02/world";
import type { Vec2, VertexId } from "@/lib/geometry/types";

export const CHIP_R = 11;
export const HIT_R = CHIP_R + 5;
export const RING_R = 36;

export function playPad(width: number, height: number) {
  return Math.min(RING_R + 4, width * 0.2, height * 0.2);
}

export function playToPx(point: Vec2, width: number, height: number): Vec2 {
  const pad = playPad(width, height);
  return {
    x: pad + point.x * (width - pad * 2),
    y: pad + point.y * (height - pad * 2),
  };
}

export function hitPlayVertex(
  point: Vec2,
  width: number,
  height: number,
): VertexId | null {
  let best: VertexId | null = null;
  let bestDist = HIT_R;

  for (const id of ["a", "b", "c"] as VertexId[]) {
    const vertex = playToPx(TRIANGLE[id], width, height);
    const dist = Math.hypot(point.x - vertex.x, point.y - vertex.y);
    if (dist <= bestDist) {
      bestDist = dist;
      best = id;
    }
  }

  return best;
}
