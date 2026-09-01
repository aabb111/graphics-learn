import { sizeCanvas } from "@/lib/geometry/draw-scene";
import type { Vec2 } from "@/lib/geometry/types";

import { rotateHandlesOf, vertsOf, type TriangleVerts } from "@/lib/day-05/transform";
import {
  GHOST,
  GHOST_FILL,
  GHOST_STROKE,
  GHOST_STROKE_W,
  HANDLE_STROKE,
  PLAY_FILL,
  ROTATE_R,
  SCALE_SIZE,
  type Trs,
} from "@/lib/day-05/world";

function fillTriangle(
  ctx: CanvasRenderingContext2D,
  verts: TriangleVerts,
  fill: string,
  stroke?: string,
  strokeWidth = 1,
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
  ctx.lineWidth = strokeWidth;
  ctx.stroke();
}

function drawScaleHandle(ctx: CanvasRenderingContext2D, point: Vec2) {
  const half = SCALE_SIZE / 2;
  ctx.fillStyle = PLAY_FILL;
  ctx.fillRect(point.x - half, point.y - half, SCALE_SIZE, SCALE_SIZE);
  ctx.lineWidth = HANDLE_STROKE;
  ctx.strokeStyle = "#ffffff";
  ctx.strokeRect(
    point.x - half - HANDLE_STROKE / 2,
    point.y - half - HANDLE_STROKE / 2,
    SCALE_SIZE + HANDLE_STROKE,
    SCALE_SIZE + HANDLE_STROKE,
  );
}

function drawRotateHandle(ctx: CanvasRenderingContext2D, point: Vec2) {
  ctx.beginPath();
  ctx.arc(point.x, point.y, ROTATE_R, 0, Math.PI * 2);
  ctx.fillStyle = PLAY_FILL;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(point.x, point.y, ROTATE_R + HANDLE_STROKE / 2, 0, Math.PI * 2);
  ctx.lineWidth = HANDLE_STROKE;
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
  fillTriangle(ctx, ghost, GHOST_FILL, GHOST_STROKE, GHOST_STROKE_W);
  fillTriangle(ctx, verts, PLAY_FILL);
  drawScaleHandle(ctx, verts.a);
  drawScaleHandle(ctx, verts.b);
  drawScaleHandle(ctx, verts.c);
  for (const handle of rotateHandlesOf(verts)) {
    drawRotateHandle(ctx, handle);
  }
}
