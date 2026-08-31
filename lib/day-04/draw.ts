import { sizeCanvas } from "@/lib/geometry/draw-scene";
import type { Vec2 } from "@/lib/geometry/types";

import { toCss } from "@/lib/day-04/stack";
import { FILL, SHAPE, type TriId } from "@/lib/day-04/world";

const VERTEX_R = 3;
const ORDER: TriId[] = ["a", "b"];

function fillTriangle(
  ctx: CanvasRenderingContext2D,
  a: Vec2,
  b: Vec2,
  c: Vec2,
  fill: string,
) {
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.lineTo(c.x, c.y);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = "rgb(20 20 20 / 0.22)";
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawVertex(ctx: CanvasRenderingContext2D, point: Vec2, fill: string) {
  ctx.beginPath();
  ctx.arc(point.x, point.y, VERTEX_R, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
}

export function drawStack(
  canvas: HTMLCanvasElement,
  depths: Record<TriId, number>,
) {
  const { cssW, cssH, dpr } = sizeCanvas(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssW, cssH);
  const farFirst = [...ORDER].sort((left, right) => depths[left] - depths[right]);
  for (const id of farFirst) {
    const css = toCss(SHAPE[id], cssW, cssH);
    fillTriangle(ctx, css.a, css.b, css.c, FILL[id]);
    drawVertex(ctx, css.a, FILL[id]);
    drawVertex(ctx, css.b, FILL[id]);
    drawVertex(ctx, css.c, FILL[id]);
  }
}
