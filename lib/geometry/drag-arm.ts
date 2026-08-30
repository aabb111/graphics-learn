export const DRAG_ARM_PX = 8;

export function draggedPast(
  origin: { x: number; y: number },
  point: { x: number; y: number },
  minPx = DRAG_ARM_PX,
) {
  return Math.hypot(point.x - origin.x, point.y - origin.y) >= minPx;
}

export function holdReady(input: {
  armed: boolean;
  released: boolean;
  dragging: boolean;
  degenerate: boolean;
}) {
  return (
    input.armed &&
    input.released &&
    !input.dragging &&
    !input.degenerate
  );
}
