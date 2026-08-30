import type { Vec2, VertexId } from "@/lib/geometry/types";

function distance2(a: Vec2, b: Vec2) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}

export function hitTarget(
  point: Vec2,
  vertices: { a: Vec2; b: Vec2; c: Vec2 },
  radius = 16,
): VertexId | null {
  const limit = radius * radius;
  const order: VertexId[] = ["a", "b", "c"];

  for (const id of order) {
    if (distance2(point, vertices[id]) <= limit) {
      return id;
    }
  }

  return null;
}

export function pointerToCss(
  event: Pick<PointerEvent, "clientX" | "clientY">,
  canvas: HTMLCanvasElement,
): Vec2 {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}
