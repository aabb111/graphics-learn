import { mixColor } from "@/lib/geometry/barycentric";
import type { RGB, VertexColors } from "@/lib/geometry/types";

const SAMPLES: Array<[number, number, number]> = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
  [1 / 3, 1 / 3, 1 / 3],
  [0.5, 0.5, 0],
  [0.5, 0, 0.5],
  [0, 0.5, 0.5],
  [0.6, 0.2, 0.2],
  [0.2, 0.6, 0.2],
  [0.2, 0.2, 0.6],
];

const MAX_RGB = 255 * Math.sqrt(3);
const MATCH_LIMIT = 0.068;

function rgbDistance(a: RGB, b: RGB) {
  const dr = a[0] - b[0];
  const dg = a[1] - b[1];
  const db = a[2] - b[2];
  return Math.hypot(dr, dg, db) / MAX_RGB;
}

function sampleColor(weights: [number, number, number], colors: VertexColors): RGB {
  return mixColor(
    { alpha: weights[0], beta: weights[1], gamma: weights[2], degenerate: false },
    colors.a,
    colors.b,
    colors.c,
  );
}

export function matchScore(play: VertexColors, target: VertexColors) {
  const distances = SAMPLES.map((weights) =>
    rgbDistance(sampleColor(weights, play), sampleColor(weights, target)),
  );
  const worst = Math.max(...distances);
  const mean = distances.reduce((sum, item) => sum + item, 0) / distances.length;
  return {
    closeness: Math.max(0, 1 - mean / 0.16),
    matched: worst <= MATCH_LIMIT,
  };
}
