import { barycentric, isInside, mixColor } from "@/lib/geometry/barycentric";
import { VERTEX_RGB } from "@/lib/geometry/colors";
import type { Vec2, VertexColors } from "@/lib/geometry/types";

export function rasterizeTriangle(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  a: Vec2,
  b: Vec2,
  c: Vec2,
  colors: VertexColors = VERTEX_RGB,
) {
  const image = ctx.createImageData(width, height);
  const data = image.data;
  const minX = Math.max(0, Math.floor(Math.min(a.x, b.x, c.x) - 1));
  const maxX = Math.min(width - 1, Math.ceil(Math.max(a.x, b.x, c.x) + 1));
  const minY = Math.max(0, Math.floor(Math.min(a.y, b.y, c.y) - 1));
  const maxY = Math.min(height - 1, Math.ceil(Math.max(a.y, b.y, c.y) + 1));

  for (let y = minY; y <= maxY; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      const bc = barycentric({ x: x + 0.5, y: y + 0.5 }, a, b, c);
      if (!isInside(bc, 0.003)) continue;

      const [red, green, blue] = mixColor(bc, colors.a, colors.b, colors.c);
      const edge = Math.min(bc.alpha, bc.beta, bc.gamma);
      const coverage = Math.min(1, Math.max(0.4, edge / 0.01));
      const index = (y * width + x) * 4;
      data[index] = red;
      data[index + 1] = green;
      data[index + 2] = blue;
      data[index + 3] = Math.round(255 * coverage);
    }
  }

  ctx.putImageData(image, 0, 0);
}
