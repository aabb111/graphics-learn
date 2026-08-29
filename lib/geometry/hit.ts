import type { DragTarget, Vec2 } from "@/lib/geometry/types";

function distance2(a: Vec2, b: Vec2) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}

export function hitTarget(
  point: Vec2,
  vertices: { a: Vec2; b: Vec2; c: Vec2 },
  probe: Vec2,
  radius = 16,
): DragTarget | null {
  const limit = radius * radius;
  const verticesFirst: Array<["a" | "b" | "c", Vec2]> = [
    ["a", vertices.a],
    ["b", vertices.b],
    ["c", vertices.c],
  ];

  for (const [id, vertex] of verticesFirst) {
    if (distance2(point, vertex) <= limit) {
      return id;
    }
  }

  if (distance2(point, probe) <= limit) {
    return "probe";
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
