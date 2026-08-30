import { barycentric, isInside } from "@/lib/geometry/barycentric";
import type { Vec2 } from "@/lib/geometry/types";

export const TARGET_RING_R = 10;
export const SAMPLE_R = 7;
export const SAMPLE_HIT_R = 14;

export const SPAWN_WEIGHTS = {
  alpha: 0.72,
  beta: 0.14,
  gamma: 0.14,
};

export function mixPoint(
  a: Vec2,
  b: Vec2,
  c: Vec2,
  weights: { alpha: number; beta: number; gamma: number },
): Vec2 {
  return {
    x: weights.alpha * a.x + weights.beta * b.x + weights.gamma * c.x,
    y: weights.alpha * a.y + weights.beta * b.y + weights.gamma * c.y,
  };
}

export function spawnSample(a: Vec2, b: Vec2, c: Vec2) {
  return mixPoint(a, b, c, SPAWN_WEIGHTS);
}

export function clampToTriangle(point: Vec2, a: Vec2, b: Vec2, c: Vec2): Vec2 {
  const bc = barycentric(point, a, b, c);
  if (!bc.degenerate && isInside(bc, 1e-4)) return point;
  const alpha = Math.max(1e-3, bc.alpha);
  const beta = Math.max(1e-3, bc.beta);
  const gamma = Math.max(1e-3, bc.gamma);
  const sum = alpha + beta + gamma;
  return mixPoint(a, b, c, {
    alpha: alpha / sum,
    beta: beta / sum,
    gamma: gamma / sum,
  });
}

export function inTargetRing(sample: Vec2, centroid: Vec2, radius = TARGET_RING_R) {
  return Math.hypot(sample.x - centroid.x, sample.y - centroid.y) <= radius;
}
