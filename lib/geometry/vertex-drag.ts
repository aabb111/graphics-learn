import { draggedPast } from "@/lib/geometry/drag-arm";
import type { Vec2, VertexId } from "@/lib/geometry/types";

export const VERTEX_TRAVEL_PX = 40;

type Homes = { a: Vec2; b: Vec2; c: Vec2 };

export function createVertexDrag() {
  let pointerId: number | null = null;
  let homes: Homes | null = null;
  let moved: Record<VertexId, boolean> = { a: false, b: false, c: false };

  return {
    captureHome(points: Homes) {
      if (homes) return;
      homes = {
        a: { ...points.a },
        b: { ...points.b },
        c: { ...points.c },
      };
    },
    down(id: number) {
      pointerId = id;
    },
    mark(id: VertexId, current: Vec2, width: number, height: number) {
      if (!homes) return;
      const home = homes[id];
      const travel = {
        x: (current.x - home.x) * width,
        y: (current.y - home.y) * height,
      };
      if (draggedPast({ x: 0, y: 0 }, travel, VERTEX_TRAVEL_PX)) {
        moved[id] = true;
      }
    },
    up(id: number) {
      if (pointerId !== id) return;
      pointerId = null;
    },
    cancel(id: number) {
      if (pointerId !== id) return;
      pointerId = null;
    },
    reset() {
      pointerId = null;
      homes = null;
      moved = { a: false, b: false, c: false };
    },
    canHold() {
      return moved.a && moved.b && moved.c && pointerId === null;
    },
  };
}
