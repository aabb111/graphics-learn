import type { Barycentric, RGB, Vec2 } from "@/lib/geometry/types";

export function signedArea(a: Vec2, b: Vec2, c: Vec2) {
  return (b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y);
}

export function barycentric(p: Vec2, a: Vec2, b: Vec2, c: Vec2): Barycentric {
  const den = signedArea(a, b, c);
  if (Math.abs(den) < 1e-6) {
    return { alpha: 0, beta: 0, gamma: 0, degenerate: true };
  }

  return {
    alpha: signedArea(p, b, c) / den,
    beta: signedArea(p, c, a) / den,
    gamma: signedArea(p, a, b) / den,
    degenerate: false,
  };
}

export function isInside(bc: Barycentric, epsilon = 2e-3) {
  if (bc.degenerate) return false;
  return bc.alpha >= -epsilon && bc.beta >= -epsilon && bc.gamma >= -epsilon;
}

export function mixColor(bc: Barycentric, ca: RGB, cb: RGB, cc: RGB): RGB {
  return [
    bc.alpha * ca[0] + bc.beta * cb[0] + bc.gamma * cc[0],
    bc.alpha * ca[1] + bc.beta * cb[1] + bc.gamma * cc[1],
    bc.alpha * ca[2] + bc.beta * cb[2] + bc.gamma * cc[2],
  ];
}

export function isNearCenter(bc: Barycentric) {
  return !bc.degenerate && isInside(bc) && centerCloseness(bc) >= 0.85;
}

export function centerCloseness(bc: Barycentric) {
  if (bc.degenerate) return 0;
  const drift =
    Math.abs(bc.alpha - 1 / 3) +
    Math.abs(bc.beta - 1 / 3) +
    Math.abs(bc.gamma - 1 / 3);
  return Math.max(0, 1 - drift / (4 / 3));
}

export function toPx(p: Vec2, width: number, height: number): Vec2 {
  return { x: p.x * width, y: p.y * height };
}

export function toNorm(p: Vec2, width: number, height: number): Vec2 {
  return { x: p.x / width, y: p.y / height };
}
