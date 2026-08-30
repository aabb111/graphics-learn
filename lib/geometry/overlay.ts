import { VERTEX_HEX, rgbToCss } from "@/lib/geometry/colors";
import { SAMPLE_R, TARGET_RING_R } from "@/lib/geometry/sample";
import type { RGB, Vec2 } from "@/lib/geometry/types";

type OverlayInput = {
  a: Vec2;
  b: Vec2;
  c: Vec2;
  sample: Vec2;
  mix: RGB;
  ringFill: number;
  solved?: boolean;
  winBeat?: number;
  stem?: { contact: Vec2; opacity: number } | null;
};

const VERTEX_R = 3;
const PALE = { r: 120, g: 170, b: 230 };
const GREEN = { r: 26, g: 127, b: 75 };

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
  ctx.arc(point.x, point.y, VERTEX_R, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
}

function easeOut(t: number) {
  return 1 - (1 - t) * (1 - t);
}

function mix(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

function cssRgb(
  from: { r: number; g: number; b: number },
  to: { r: number; g: number; b: number },
  t: number,
  alpha: number,
) {
  return `rgb(${mix(from.r, to.r, t)} ${mix(from.g, to.g, t)} ${mix(from.b, to.b, t)} / ${alpha})`;
}

function drawStem(
  ctx: CanvasRenderingContext2D,
  contact: Vec2,
  sample: Vec2,
  opacity: number,
) {
  if (opacity <= 0) return;
  ctx.beginPath();
  ctx.moveTo(contact.x, contact.y);
  ctx.lineTo(sample.x, sample.y);
  ctx.strokeStyle = `rgb(20 20 20 / ${0.22 * opacity})`;
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawSample(ctx: CanvasRenderingContext2D, point: Vec2, fill: RGB) {
  ctx.beginPath();
  ctx.arc(point.x, point.y, SAMPLE_R, 0, Math.PI * 2);
  ctx.fillStyle = rgbToCss(fill);
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
  solved: boolean,
  winBeat: number,
) {
  const x = (a.x + b.x + c.x) / 3;
  const y = (a.y + b.y + c.y) / 3;
  ctx.beginPath();
  ctx.arc(x, y, TARGET_RING_R, 0, Math.PI * 2);
  if (solved) {
    const t = easeOut(winBeat);
    ctx.fillStyle = cssRgb(PALE, GREEN, t, mix(0.22, 1, t));
    ctx.fill();
    ctx.strokeStyle = cssRgb(PALE, GREEN, t, mix(0.55, 1, t));
    ctx.lineWidth = 1.25;
    ctx.stroke();
    return;
  }
  if (ringFill > 0) {
    ctx.fillStyle = `rgb(${PALE.r} ${PALE.g} ${PALE.b} / ${0.22 * ringFill})`;
    ctx.fill();
  }
  ctx.strokeStyle = `rgb(${PALE.r} ${PALE.g} ${PALE.b} / 0.55)`;
  ctx.lineWidth = 1.25;
  ctx.stroke();
}

export function drawOverlay(ctx: CanvasRenderingContext2D, input: OverlayInput) {
  const { a, b, c, sample, mix: sampleMix } = input;
  strokeTriangle(ctx, a, b, c);
  drawCentroid(ctx, a, b, c, input.ringFill, Boolean(input.solved), input.winBeat ?? 1);
  if (!input.solved && input.stem) {
    drawStem(ctx, input.stem.contact, sample, input.stem.opacity);
  }
  if (!input.solved) drawSample(ctx, sample, sampleMix);
  drawVertex(ctx, a, VERTEX_HEX.a);
  drawVertex(ctx, b, VERTEX_HEX.b);
  drawVertex(ctx, c, VERTEX_HEX.c);
}
