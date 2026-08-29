import { rgbToCss, VERTEX_HEX, VERTEX_RGB } from "@/lib/geometry/colors";
import type { RGB, Vec2 } from "@/lib/geometry/types";

type OverlayInput = {
  a: Vec2;
  b: Vec2;
  c: Vec2;
  probe: Vec2;
  mix: RGB;
  inside: boolean;
  degenerate: boolean;
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

function drawVertex(
  ctx: CanvasRenderingContext2D,
  point: Vec2,
  fill: string,
  label: string,
) {
  ctx.beginPath();
  ctx.arc(point.x, point.y, 7, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = "#fff";
  ctx.stroke();

  ctx.font = "500 11px var(--font-sans), sans-serif";
  ctx.fillStyle = "rgb(20 20 20 / 0.72)";
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.fillText(label, point.x, point.y - 11);
}

function drawProbe(
  ctx: CanvasRenderingContext2D,
  probe: Vec2,
  mix: RGB,
  inside: boolean,
) {
  ctx.beginPath();
  ctx.arc(probe.x, probe.y, 8, 0, Math.PI * 2);
  ctx.fillStyle = inside ? rgbToCss(mix) : "#fff";
  ctx.fill();
  ctx.lineWidth = 1.25;
  ctx.strokeStyle = inside ? "rgb(20 20 20 / 0.85)" : "rgb(20 20 20 / 0.35)";
  if (!inside) ctx.setLineDash([2.5, 2]);
  ctx.stroke();
  ctx.setLineDash([]);
}

export function drawOverlay(ctx: CanvasRenderingContext2D, input: OverlayInput) {
  const { a, b, c, probe, mix, inside, degenerate } = input;
  strokeTriangle(ctx, a, b, c);
  drawVertex(ctx, a, VERTEX_HEX.a, "A · α");
  drawVertex(ctx, b, VERTEX_HEX.b, "B · β");
  drawVertex(ctx, c, VERTEX_HEX.c, "C · γ");
  drawProbe(ctx, probe, mix, inside && !degenerate);

  if (!inside && !degenerate) {
    ctx.font = "400 12px var(--font-sans), sans-serif";
    ctx.fillStyle = "rgb(20 20 20 / 0.46)";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText("在外面", probe.x + 14, probe.y);
  }
}

export { VERTEX_RGB };
