import { sizeCanvas } from "@/lib/geometry/draw-scene";
import type { Vec2 } from "@/lib/geometry/types";

import { rotateHandleOf, vertsOf, type TriangleVerts } from "@/lib/day-05/transform";
import {
  GHOST,
  GHOST_FILL,
  GHOST_STROKE,
  PLAY_FILL,
  ROTATE_R,
  ROTATE_STROKE,
  VERTEX_R,
  type Trs,
} from "@/lib/day-05/world";

function fillTriangle(
  ctx: CanvasRenderingContext2D,
  verts: TriangleVerts,
  fill: string,
  stroke?: string,
) {
  ctx.beginPath();
  ctx.moveTo(verts.a.x, verts.a.y);
  ctx.lineTo(verts.b.x, verts.b.y);
  ctx.lineTo(verts.c.x, verts.c.y);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  if (!stroke) return;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawDot(ctx: CanvasRenderingContext2D, point: Vec2, radius: number, fill: string) {
  ctx.beginPath();
  ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
}

function drawRotateHandle(ctx: CanvasRenderingContext2D, point: Vec2) {
  ctx.beginPath();
  ctx.arc(point.x, point.y, ROTATE_R, 0, Math.PI * 2);
  ctx.fillStyle = PLAY_FILL;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(point.x, point.y, ROTATE_R + ROTATE_STROKE / 2, 0, Math.PI * 2);
  ctx.lineWidth = ROTATE_STROKE;
  ctx.strokeStyle = "#ffffff";
  ctx.stroke();
}

export function drawTransform(canvas: HTMLCanvasElement, play: Trs) {
  const { cssW, cssH, dpr } = sizeCanvas(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssW, cssH);
  const ghost = vertsOf(GHOST, cssW, cssH);
  const verts = vertsOf(play, cssW, cssH);
  fillTriangle(ctx, ghost, GHOST_FILL, GHOST_STROKE);
  fillTriangle(ctx, verts, PLAY_FILL);
  drawDot(ctx, verts.a, VERTEX_R, PLAY_FILL);
  drawDot(ctx, verts.b, VERTEX_R, PLAY_FILL);
  drawDot(ctx, verts.c, VERTEX_R, PLAY_FILL);
  drawRotateHandle(ctx, rotateHandleOf(verts));
}
