import { hitPoint } from "@/lib/geometry/hit";
import type { Vec2 } from "@/lib/geometry/types";

import { clampDepth } from "@/lib/day-04/stack";
import type { TriId } from "@/lib/day-04/world";

export const HANDLE_R = 7;
export const HANDLE_STROKE = 2;
export const HANDLE_HIT = 16;
export const TOUCH_HIT = 22;
export const TRACK_W = 4;

export type Track = {
  x: number;
  top: number;
  bottom: number;
};

export function tracksOf(width: number, height: number): Record<TriId, Track> {
  const top = height * 0.18;
  const bottom = height * 0.82;
  return {
    a: { x: Math.max(22, width * 0.07), top, bottom },
    b: { x: Math.min(width - 22, width * 0.93), top, bottom },
  };
}

export function handleCenter(track: Track, depth: number): Vec2 {
  return {
    x: track.x,
    y: track.top + (1 - depth) * (track.bottom - track.top),
  };
}

export function depthFromY(track: Track, y: number) {
  return clampDepth(1 - (y - track.top) / (track.bottom - track.top));
}

export function hitHandle(
  point: Vec2,
  tracks: Record<TriId, Track>,
  depths: Record<TriId, number>,
  radius: number,
): TriId | null {
  const ids: TriId[] = ["a", "b"];
  for (const id of ids) {
    if (hitPoint(point, handleCenter(tracks[id], depths[id]), radius)) return id;
  }
  return null;
}
