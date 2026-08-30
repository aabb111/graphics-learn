import { VERTEX_HEX } from "@/lib/geometry/colors";
import type { Vec2 } from "@/lib/geometry/types";

type OverlayInput = {
  a: Vec2;
  b: Vec2;
  c: Vec2;
  ringFill: number;
};

function strokeTriangle(
  ctx: CanvasRenderingContext2D,
  a: Vec2,
  b: Vec2,
  c: Vec2,
) {
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.lineTo(c.x, c.y);
  ctx.closePath();
  ctx.strokeStyle = "rgb(20 20 20 / 0.22)";
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawVertex(ctx: CanvasRenderingContext2D, point: Vec2, fill: string) {
  ctx.beginPath();
  ctx.arc(point.x, point.y, 10, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#fff";
  ctx.stroke();
}

function drawCentroid(
  ctx: CanvasRenderingContext2D,
  a: Vec2,
  b: Vec2,
  c: Vec2,
  ringFill: number,
) {
  const x = (a.x + b.x + c.x) / 3;
  const y = (a.y + b.y + c.y) / 3;
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  if (ringFill > 0) {
    ctx.fillStyle = `rgb(120 170 230 / ${0.22 * ringFill})`;
    ctx.fill();
  }
  ctx.strokeStyle = "rgb(120 170 230 / 0.55)";
  ctx.lineWidth = 1.25;
  ctx.stroke();
}

export function drawOverlay(ctx: CanvasRenderingContext2D, input: OverlayInput) {
  const { a, b, c } = input;
  strokeTriangle(ctx, a, b, c);
  drawCentroid(ctx, a, b, c, input.ringFill);
  drawVertex(ctx, a, VERTEX_HEX.a);
  drawVertex(ctx, b, VERTEX_HEX.b);
  drawVertex(ctx, c, VERTEX_HEX.c);
}
