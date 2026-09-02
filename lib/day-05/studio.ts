import type { PointerEvent } from "react";

import { drawTransform } from "@/lib/day-05/draw";
import { pickHit, type DragKind } from "@/lib/day-05/hit";
import { trsMatch } from "@/lib/day-05/match";
import {
  centroidPx,
  clampCenter,
  clampScale,
  vertsOf,
} from "@/lib/day-05/transform";
import {
  TOUCH_HIT,
  VERTEX_HIT,
  createWorld,
  readTrs,
  resetTransform,
  type TransformWorld,
} from "@/lib/day-05/world";
import { createHoldWatch } from "@/lib/geometry/hold";
import { pointerToCss } from "@/lib/geometry/hit";
import type { Vec2 } from "@/lib/geometry/types";

export type TransformHud = {
  solved: boolean;
  holding: boolean;
  cursor: "grab" | "grabbing" | "default";
};

export type TransformStudio = {
  bindCanvas: (node: HTMLCanvasElement | null) => void;
  onPointerDown: (event: PointerEvent<HTMLCanvasElement>) => void;
  onPointerMove: (event: PointerEvent<HTMLCanvasElement>) => void;
  onPointerUp: (event: PointerEvent<HTMLCanvasElement>) => void;
  onPointerLeave: () => void;
  reset: () => void;
};

export const INITIAL_HUD: TransformHud = {
  solved: false,
  holding: false,
  cursor: "default",
};

type DragState = {
  kind: DragKind;
  grab: Vec2;
  last: Vec2;
  touch: boolean;
  angle: number;
  scale: number;
  dist: number;
};

function isRemote(type: string) {
  return type === "touch" || type === "pen";
}

function blockNativeSelect(event: Event) {
  event.preventDefault();
}

export function createTransformStudio(
  onHud: (hud: TransformHud) => void,
): TransformStudio {
  const world: TransformWorld = createWorld();
  let canvas: HTMLCanvasElement | null = null;
  let observer: ResizeObserver | null = null;
  let drag: DragState | null = null;
  let hover = false;
  let progressed = false;
  const hold = createHoldWatch(() => sync());

  function size() {
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  }

  function cursor(): TransformHud["cursor"] {
    if (drag) return "grabbing";
    if (hover) return "grab";
    return "default";
  }

  function sync() {
    const next = size();
    if (!next || next.width < 8 || next.height < 8) {
      if (canvas) drawTransform(canvas, readTrs(world));
      return;
    }
    const ready =
      progressed && trsMatch(world, next.width, next.height) && !world.solved && !drag;
    hold.evaluate(world, ready);
    drawTransform(canvas!, readTrs(world));
    onHud({ solved: world.solved, holding: world.holding, cursor: cursor() });
  }

  function applyDrag(css: Vec2, next: { width: number; height: number }) {
    if (!drag) return;
    const before = readTrs(world);
    if (drag.kind.kind === "body" && drag.touch) {
      world.cx = clampCenter(world.cx + (css.x - drag.last.x) / next.width);
      world.cy = clampCenter(world.cy + (css.y - drag.last.y) / next.height);
      drag.last = { ...css };
    } else if (drag.kind.kind === "body") {
      world.cx = clampCenter((css.x - drag.grab.x) / next.width);
      world.cy = clampCenter((css.y - drag.grab.y) / next.height);
    } else if (drag.kind.kind === "rotate") {
      const center = centroidPx(world, next.width, next.height);
      world.rotation = Math.atan2(css.y - center.y, css.x - center.x) - drag.angle;
    } else {
      const center = centroidPx(world, next.width, next.height);
      const dist = Math.hypot(css.x - center.x, css.y - center.y);
      if (drag.dist > 1) {
        world.scale = clampScale(drag.scale * (dist / drag.dist));
      }
    }
    if (
      before.cx !== world.cx ||
      before.cy !== world.cy ||
      before.rotation !== world.rotation ||
      before.scale !== world.scale
    ) {
      progressed = true;
    }
  }

  return {
    bindCanvas(node) {
      observer?.disconnect();
      observer = null;
      if (canvas) {
        canvas.removeEventListener("selectstart", blockNativeSelect);
        canvas.removeEventListener("contextmenu", blockNativeSelect);
        canvas.removeEventListener("touchstart", blockNativeSelect);
      }
      canvas = node;
      if (!node) return;
      node.addEventListener("selectstart", blockNativeSelect);
      node.addEventListener("contextmenu", blockNativeSelect);
      node.addEventListener("touchstart", blockNativeSelect, { passive: false });
      observer = new ResizeObserver(() => sync());
      observer.observe(node);
      sync();
    },
    onPointerDown(event) {
      if (world.solved || !canvas) return;
      event.preventDefault();
      const next = size();
      if (!next) return;
      const css = pointerToCss(event.nativeEvent, canvas);
      const verts = vertsOf(world, next.width, next.height);
      const hitR = isRemote(event.nativeEvent.pointerType) ? TOUCH_HIT : VERTEX_HIT;
      const kind = pickHit(css, verts, hitR, hitR);
      if (!kind) {
        hover = false;
        sync();
        return;
      }
      const center = centroidPx(world, next.width, next.height);
      drag = {
        kind,
        grab: { x: css.x - center.x, y: css.y - center.y },
        last: { ...css },
        touch: isRemote(event.nativeEvent.pointerType),
        angle: Math.atan2(css.y - center.y, css.x - center.x) - world.rotation,
        scale: world.scale,
        dist: Math.hypot(css.x - center.x, css.y - center.y),
      };
      hover = true;
      try {
        canvas.setPointerCapture(event.nativeEvent.pointerId);
      } catch {
        /* already released */
      }
      sync();
    },
    onPointerMove(event) {
      if (!canvas) return;
      const next = size();
      if (!next) return;
      const css = pointerToCss(event.nativeEvent, canvas);
      if (drag) {
        applyDrag(css, next);
      } else {
        const verts = vertsOf(world, next.width, next.height);
        hover = Boolean(pickHit(css, verts));
      }
      sync();
    },
    onPointerUp(event) {
      if (canvas?.hasPointerCapture(event.nativeEvent.pointerId)) {
        canvas.releasePointerCapture(event.nativeEvent.pointerId);
      }
      drag = null;
      sync();
    },
    onPointerLeave() {
      if (drag) return;
      hover = false;
      sync();
    },
    reset() {
      resetTransform(world);
      drag = null;
      hover = false;
      progressed = false;
      hold.stop();
      sync();
    },
  };
}
