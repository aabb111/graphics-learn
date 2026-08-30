import { hslToRgb, rgbToCss } from "@/lib/day-02/hue";
import { drawHueRing, type HueRingLook } from "@/lib/day-02/hue-ring";
import { TARGET_HUES, TRIANGLE, type Hues } from "@/lib/day-02/world";
import { sizeCanvas } from "@/lib/geometry/draw-scene";
import { rasterizeTriangle } from "@/lib/geometry/rasterize";
import { toPx } from "@/lib/geometry/barycentric";

function huesToColors(hues: Hues) {
  return {
    a: hslToRgb(hues.a),
    b: hslToRgb(hues.b),
    c: hslToRgb(hues.c),
  };
}

function strokeTriangle(
  ctx: CanvasRenderingContext2D,
  a: { x: number; y: number },
  b: { x: number; y: number },
  c: { x: number; y: number },
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

const PLAY_KNOB_R = 11;

function drawKnob(
  ctx: CanvasRenderingContext2D,
  point: { x: number; y: number },
  fill: string,
  radius: number,
  label?: string,
) {
  ctx.beginPath();
  ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#fff";
  ctx.stroke();
  if (!label) return;
  ctx.font = "500 12px var(--font-sans), sans-serif";
  ctx.fillStyle = fill;
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.fillText(label, point.x, point.y - radius - 4);
}

function paintFill(
  canvas: HTMLCanvasElement,
  fill: HTMLCanvasElement,
  hues: Hues,
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
  if (!fillCtx || !ctx || cssW < 8 || cssH < 8) return null;
  const a = toPx(TRIANGLE.a, cssW, cssH);
  const b = toPx(TRIANGLE.b, cssW, cssH);
  const c = toPx(TRIANGLE.c, cssW, cssH);
  fillCtx.clearRect(0, 0, fillW, fillH);
  rasterizeTriangle(fillCtx, fillW, fillH, a, b, c, huesToColors(hues));
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssW, cssH);
  ctx.drawImage(fill, 0, 0, cssW, cssH);
  strokeTriangle(ctx, a, b, c);
  return { ctx, a, b, c };
}

export function drawPlay(
  canvas: HTMLCanvasElement,
  fill: HTMLCanvasElement,
  hues: Hues,
  ring: HueRingLook | null,
) {
  const painted = paintFill(canvas, fill, hues);
  if (!painted) return;
  const { ctx, a, b, c } = painted;
  const colors = huesToColors(hues);
  if (ring) drawHueRing(ctx, ring);
  drawKnob(ctx, a, rgbToCss(colors.a), PLAY_KNOB_R, "A");
  drawKnob(ctx, b, rgbToCss(colors.b), PLAY_KNOB_R, "B");
  drawKnob(ctx, c, rgbToCss(colors.c), PLAY_KNOB_R, "C");
}

export function drawTarget(canvas: HTMLCanvasElement, fill: HTMLCanvasElement) {
  const painted = paintFill(canvas, fill, TARGET_HUES);
  if (!painted) return;
  const { ctx, a, b, c } = painted;
  const colors = huesToColors(TARGET_HUES);
  drawKnob(ctx, a, rgbToCss(colors.a), 8);
  drawKnob(ctx, b, rgbToCss(colors.b), 8);
  drawKnob(ctx, c, rgbToCss(colors.c), 8);
}

export { huesToColors };
