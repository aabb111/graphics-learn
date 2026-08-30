import type { Hues } from "@/lib/day-02/world";

const MATCH_HUE = 14;

export function hueDist(a: number, b: number) {
  const delta = ((a - b) % 360 + 360) % 360;
  return Math.min(delta, 360 - delta);
}

export function matchScore(play: Hues, target: Hues) {
  const distances = [
    hueDist(play.a, target.a),
    hueDist(play.b, target.b),
    hueDist(play.c, target.c),
  ];
  const mean = distances.reduce((sum, item) => sum + item, 0) / distances.length;
  const worst = Math.max(...distances);
  return {
    closeness: Math.max(0, Math.min(1, 1 - mean / 180)),
    matched: worst <= MATCH_HUE,
  };
}
