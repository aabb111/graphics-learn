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

function drawVertex(
  ctx: CanvasRenderingContext2D,
  point: Vec2,
  fill: string,
  label: string,
) {
  ctx.beginPath();
  ctx.arc(point.x, point.y, 10, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#fff";
  ctx.stroke();

  ctx.font = "500 12px var(--font-sans), sans-serif";
  ctx.fillStyle = fill;
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.fillText(label, point.x, point.y - 14);
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
  const { a, b, c, probe, mix, inside, degenerate } = input;
  strokeTriangle(ctx, a, b, c);
  drawCentroid(ctx, a, b, c, input.ringFill);
  drawVertex(ctx, a, VERTEX_HEX.a, "A · α");
  drawVertex(ctx, b, VERTEX_HEX.b, "B · β");
  drawVertex(ctx, c, VERTEX_HEX.c, "C · γ");
  drawProbe(ctx, probe, mix, inside && !degenerate);

  if (!inside && !degenerate) {
    ctx.font = "400 13px var(--font-sans), sans-serif";
    ctx.fillStyle = "rgb(20 20 20 / 0.72)";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText("在外面", probe.x + 14, probe.y);
  }
}

export { VERTEX_RGB };
