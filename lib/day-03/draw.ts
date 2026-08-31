import { VERTEX_HEX } from "@/lib/geometry/colors";
import { sizeCanvas } from "@/lib/geometry/draw-scene";
import type { Vec2 } from "@/lib/geometry/types";

import { CELL, CENTER_R, VERTEX_R } from "@/lib/day-03/world";
import type { Cell, GridLayout } from "@/lib/day-03/grid";

const LIT = "#1A7F4B";
const INK = "rgb(20 20 20 / 0.55)";
const FLASH = "rgb(20 20 20 / 0.22)";

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

function drawDot(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  fill: string,
) {
  ctx.beginPath();
  ctx.arc(x, y, CENTER_R, 0, Math.PI * 2);
  ctx.fillStyle = fill;
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
  lit: boolean[],
  flashes: number[],
  now: number,
) {
  const { cssW, cssH, dpr } = sizeCanvas(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssW, cssH);
  fillTriangle(ctx, layout.a, layout.b, layout.c);
  for (const cell of cells) {
    if (lit[cell.i]) {
      ctx.fillStyle = LIT;
      ctx.fillRect(cell.x, cell.y, CELL, CELL);
    } else if (flashes[cell.i] > now) {
      ctx.fillStyle = FLASH;
      ctx.fillRect(cell.x, cell.y, CELL, CELL);
    }
  }
  drawGrid(ctx, layout);
  for (const cell of cells) {
    drawDot(ctx, cell.cx, cell.cy, lit[cell.i] ? "#ffffff" : INK);
  }
  drawVertex(ctx, layout.a, VERTEX_HEX.a);
  drawVertex(ctx, layout.b, VERTEX_HEX.b);
  drawVertex(ctx, layout.c, VERTEX_HEX.c);
}
