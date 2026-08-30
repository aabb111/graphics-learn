import { draggedPast } from "@/lib/geometry/drag-arm";
import type { Vec2 } from "@/lib/geometry/types";

export function createVertexDrag() {
  let pointerId: number | null = null;
  let origin: Vec2 = { x: 0, y: 0 };
  let armed = false;
  let mayHold = false;

  return {
    down(id: number, vertex: Vec2) {
      pointerId = id;
      origin = { x: vertex.x, y: vertex.y };
      armed = false;
      mayHold = false;
    },
    move(id: number, vertex: Vec2) {
      if (pointerId !== id) return false;
      if (draggedPast(origin, vertex)) armed = true;
      return armed;
    },
    up(id: number) {
      if (pointerId !== id) return false;
      mayHold = armed;
      pointerId = null;
      armed = false;
      return mayHold;
    },
    cancel(id: number) {
      if (pointerId !== id) return;
      pointerId = null;
      armed = false;
      mayHold = false;
    },
    reset() {
      pointerId = null;
      armed = false;
      mayHold = false;
    },
    isDown() {
      return pointerId !== null;
    },
    canHold() {
      return mayHold && pointerId === null;
    },
  };
}
