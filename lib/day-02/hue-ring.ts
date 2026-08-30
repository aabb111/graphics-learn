import { hslToRgb, rgbToCss } from "@/lib/day-02/hue";
import type { Vec2 } from "@/lib/geometry/types";

export type HueRingLook = {
  origin: Vec2;
  hue: number;
  opacity: number;
  scale: number;
};

const RING_R = 36;
const BAND = 8;
const TICK = 6;
const STEPS = 72;
const MID_R = RING_R - BAND / 2;

function easeOut(t: number) {
  return 1 - (1 - t) * (1 - t);
}

export function ringEnter(elapsed: number, reduced: boolean) {
  const t = reduced ? 1 : Math.min(1, elapsed / 120);
  return { opacity: t, scale: 0.94 + 0.06 * easeOut(t) };
}

export function ringLeave(elapsed: number, reduced: boolean) {
  if (reduced) return { opacity: 0, done: true };
  const t = Math.min(1, elapsed / 80);
  return { opacity: 1 - t, done: t >= 1 };
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function drawHueRing(ctx: CanvasRenderingContext2D, look: HueRingLook) {
  const { origin, hue, opacity, scale } = look;
  ctx.save();
  ctx.translate(origin.x, origin.y);
  ctx.scale(scale, scale);
  ctx.globalAlpha = opacity;
  ctx.lineCap = "butt";

  for (let i = 0; i < STEPS; i += 1) {
    const a0 = (i / STEPS) * Math.PI * 2;
    const a1 = ((i + 1.05) / STEPS) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(0, 0, MID_R, a0, a1);
    ctx.strokeStyle = rgbToCss(hslToRgb(((i + 0.5) / STEPS) * 360));
    ctx.lineWidth = BAND;
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.arc(0, 0, RING_R, 0, Math.PI * 2);
  ctx.strokeStyle = "rgb(20 20 20 / 0.22)";
  ctx.lineWidth = 1;
  ctx.stroke();

  const rad = (hue * Math.PI) / 180;
  ctx.beginPath();
  ctx.moveTo(Math.cos(rad) * RING_R, Math.sin(rad) * RING_R);
  ctx.lineTo(Math.cos(rad) * (RING_R - TICK), Math.sin(rad) * (RING_R - TICK));
  ctx.strokeStyle = "#141414";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();
}
