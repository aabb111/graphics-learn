import { VERTEX_HEX } from "@/lib/geometry/colors";
import { sizeCanvas } from "@/lib/geometry/draw-scene";
import type { Vec2 } from "@/lib/geometry/types";

import { CELL, CENTER_DIAMETER, VERTEX_R } from "@/lib/day-03/world";
import type { Cell, GridLayout } from "@/lib/day-03/grid";

const LIT = { r: 26, g: 127, b: 75 };
const INK = { r: 20, g: 20, b: 20, a: 0.55 };

function fillTriangle(
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
  ctx.fillStyle = "rgb(20 20 20 / 0.04)";
  ctx.fill();
  ctx.strokeStyle = "rgb(20 20 20 / 0.22)";
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawGrid(ctx: CanvasRenderingContext2D, layout: GridLayout) {
  const { cols, rows, originX, originY } = layout;
  ctx.beginPath();
  for (let col = 0; col <= cols; col++) {
    const x = originX + col * CELL;
    ctx.moveTo(x, originY);
    ctx.lineTo(x, originY + rows * CELL);
  }
  for (let row = 0; row <= rows; row++) {
    const y = originY + row * CELL;
    ctx.moveTo(originX, y);
    ctx.lineTo(originX + cols * CELL, y);
  }
  ctx.strokeStyle = "rgb(20 20 20 / 0.18)";
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawDot(ctx: CanvasRenderingContext2D, x: number, y: number, t: number) {
  const r = INK.r + (255 - INK.r) * t;
  const g = INK.g + (255 - INK.g) * t;
  const b = INK.b + (255 - INK.b) * t;
  const a = INK.a + (1 - INK.a) * t;
  ctx.beginPath();
  ctx.arc(x, y, CENTER_DIAMETER / 2, 0, Math.PI * 2);
  ctx.fillStyle = `rgb(${r} ${g} ${b} / ${a})`;
  ctx.fill();
}

function drawVertex(ctx: CanvasRenderingContext2D, point: Vec2, fill: string) {
  ctx.beginPath();
  ctx.arc(point.x, point.y, VERTEX_R, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
}

export function drawRaster(
  canvas: HTMLCanvasElement,
  layout: GridLayout,
  cells: Cell[],
  lights: number[],
) {
  const { cssW, cssH, dpr } = sizeCanvas(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssW, cssH);
  fillTriangle(ctx, layout.a, layout.b, layout.c);
  for (const cell of cells) {
    const t = lights[cell.i] ?? 0;
    if (t <= 0) continue;
    ctx.globalAlpha = t;
    ctx.fillStyle = `rgb(${LIT.r} ${LIT.g} ${LIT.b})`;
    ctx.fillRect(cell.x, cell.y, CELL, CELL);
    ctx.globalAlpha = 1;
  }
  drawGrid(ctx, layout);
  for (const cell of cells) {
    drawDot(ctx, cell.cx, cell.cy, lights[cell.i] ?? 0);
  }
  drawVertex(ctx, layout.a, VERTEX_HEX.a);
  drawVertex(ctx, layout.b, VERTEX_HEX.b);
  drawVertex(ctx, layout.c, VERTEX_HEX.c);
}
