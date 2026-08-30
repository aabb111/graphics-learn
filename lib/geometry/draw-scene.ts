import { drawOverlay } from "@/lib/geometry/overlay";
import { rasterizeTriangle } from "@/lib/geometry/rasterize";
import type { RGB, Vec2 } from "@/lib/geometry/types";

export function sizeCanvas(canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(1, Math.round(rect.width * dpr));
  const height = Math.max(1, Math.round(rect.height * dpr));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  return { cssW: rect.width, cssH: rect.height, dpr };
}

export function drawScene(
  canvas: HTMLCanvasElement,
  fill: HTMLCanvasElement,
  points: { a: Vec2; b: Vec2; c: Vec2; sample: Vec2 },
  mix: RGB,
  ringFill = 0,
  solved = false,
  winBeat = 1,
) {
  const { cssW, cssH, dpr } = sizeCanvas(canvas);
  const fillW = Math.max(1, Math.round(cssW));
  const fillH = Math.max(1, Math.round(cssH));
  if (fill.width !== fillW || fill.height !== fillH) {
    fill.width = fillW;
    fill.height = fillH;
  }

  const fillCtx = fill.getContext("2d");
  const ctx = canvas.getContext("2d");
  if (!fillCtx || !ctx) return;

  fillCtx.clearRect(0, 0, fillW, fillH);
  rasterizeTriangle(fillCtx, fillW, fillH, points.a, points.b, points.c);

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssW, cssH);
  ctx.drawImage(fill, 0, 0, cssW, cssH);
  drawOverlay(ctx, { ...points, mix, ringFill, solved, winBeat });
}
