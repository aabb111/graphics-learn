import type { PointerEvent } from "react";

import { drawStack } from "@/lib/day-04/draw";
import { clampDepth, hitFront, stackMatch } from "@/lib/day-04/stack";
import {
  createWorld,
  resetDepths,
  TARGET,
  type DepthWorld,
  type TriId,
} from "@/lib/day-04/world";
import { pointerToCss } from "@/lib/geometry/hit";
import { createHoldWatch } from "@/lib/geometry/hold";

export type DepthHud = {
  solved: boolean;
  holding: boolean;
  cursor: "grab" | "grabbing" | "default";
};

export type DepthStudio = {
  bindPlay: (node: HTMLCanvasElement | null) => void;
  bindTarget: (node: HTMLCanvasElement | null) => void;
  onPointerDown: (event: PointerEvent<HTMLCanvasElement>) => void;
  onPointerMove: (event: PointerEvent<HTMLCanvasElement>) => void;
  onPointerUp: (event: PointerEvent<HTMLCanvasElement>) => void;
  reset: () => void;
};

export const INITIAL_HUD: DepthHud = {
  solved: false,
  holding: false,
  cursor: "default",
};

export function createDepthStudio(onHud: (hud: DepthHud) => void): DepthStudio {
  const world: DepthWorld = createWorld();
  let play: HTMLCanvasElement | null = null;
  let target: HTMLCanvasElement | null = null;
  let observer: ResizeObserver | null = null;
  let drag: { id: TriId; y: number; z: number } | null = null;
  let hover: TriId | null = null;
  let progressed = false;
  const hold = createHoldWatch(() => sync());

  function size() {
    if (!play) return null;
    const rect = play.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  }

  function cursor(): DepthHud["cursor"] {
    if (drag) return "grabbing";
    if (hover) return "grab";
    return "default";
  }

  function paint() {
    if (play) drawStack(play, { a: world.a, b: world.b });
    if (target) drawStack(target, TARGET);
  }

  function sync() {
    const next = size();
    if (!next || next.width < 8 || next.height < 8) {
      paint();
      return;
    }
    const ready = progressed && stackMatch(world) && !world.solved && !drag;
    hold.evaluate(world, ready);
    paint();
    onHud({ solved: world.solved, holding: world.holding, cursor: cursor() });
  }

  function watch() {
    observer?.disconnect();
    observer = null;
    if (!play && !target) return;
    observer = new ResizeObserver(() => sync());
    if (play) observer.observe(play);
    if (target) observer.observe(target);
    sync();
  }

  return {
    bindPlay(node) {
      play = node;
      watch();
    },
    bindTarget(node) {
      target = node;
      watch();
    },
    onPointerDown(event) {
      if (world.solved || !play) return;
      event.preventDefault();
      const next = size();
      if (!next) return;
      const css = pointerToCss(event.nativeEvent, play);
      const id = hitFront(css, world, next.width, next.height);
      if (!id) return;
      drag = { id, y: css.y, z: world[id] };
      hover = id;
      try {
        play.setPointerCapture(event.nativeEvent.pointerId);
      } catch {
        /* already released */
      }
      sync();
    },
    onPointerMove(event) {
      if (!play) return;
      const next = size();
      if (!next) return;
      const css = pointerToCss(event.nativeEvent, play);
      if (drag) {
        world[drag.id] = clampDepth(drag.z - (css.y - drag.y) / next.height);
        if (Math.abs(css.y - drag.y) > 0.5) progressed = true;
      } else {
        hover = hitFront(css, world, next.width, next.height);
      }
      sync();
    },
    onPointerUp(event) {
      if (play?.hasPointerCapture(event.nativeEvent.pointerId)) {
        play.releasePointerCapture(event.nativeEvent.pointerId);
      }
      drag = null;
      sync();
    },
    reset() {
      resetDepths(world);
      drag = null;
      hover = null;
      progressed = false;
      hold.stop();
      sync();
    },
  };
}
