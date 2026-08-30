import type { PointerEvent } from "react";

import { drawPlay, drawTarget } from "@/lib/day-02/draw";
import {
  prefersReducedMotion,
  ringEnter,
  ringLeave,
  type HueRingLook,
} from "@/lib/day-02/hue-ring";
import { pointerHue } from "@/lib/day-02/hue";
import { matchScore } from "@/lib/day-02/match";
import { hitPlayVertex, playToPx } from "@/lib/day-02/play-space";
import { cloneWorld, START_HUES, TARGET_HUES, TRIANGLE } from "@/lib/day-02/world";
import { createHoldWatch } from "@/lib/geometry/hold";
import { pointerToCss } from "@/lib/geometry/hit";
import type { VertexId } from "@/lib/geometry/types";

export type ColorHud = {
  closeness: number;
  holding: boolean;
  solved: boolean;
};

export type ColorStudio = {
  bindPlay: (node: HTMLCanvasElement | null) => void;
  bindTarget: (node: HTMLCanvasElement | null) => void;
  onPointerDown: (event: PointerEvent<HTMLCanvasElement>) => void;
  onPointerMove: (event: PointerEvent<HTMLCanvasElement>) => void;
  onPointerUp: (event: PointerEvent<HTMLCanvasElement>) => void;
  reset: () => void;
};

type RingState = {
  vertex: VertexId;
  phase: "in" | "out";
  from: number;
};

function playBox(node: HTMLCanvasElement) {
  const rect = node.getBoundingClientRect();
  return { width: rect.width, height: rect.height };
}

export function createColorStudio(onHud: (hud: ColorHud) => void): ColorStudio {
  const world = cloneWorld();
  let playFill: HTMLCanvasElement | null = null;
  let targetFill: HTMLCanvasElement | null = null;
  let play: HTMLCanvasElement | null = null;
  let target: HTMLCanvasElement | null = null;
  let playObserver: ResizeObserver | null = null;
  let targetObserver: ResizeObserver | null = null;
  let ring: RingState | null = null;
  let raf = 0;
  const hold = createHoldWatch(() => sync());

  function ringLook(): HueRingLook | null {
    if (!ring || !play) return null;
    const box = playBox(play);
    const origin = playToPx(TRIANGLE[ring.vertex], box.width, box.height);
    const hue = world.hues[ring.vertex];
    const elapsed = performance.now() - ring.from;
    const reduced = prefersReducedMotion();
    if (ring.phase === "in") {
      return { origin, hue, ...ringEnter(elapsed, reduced) };
    }
    const leave = ringLeave(elapsed, reduced);
    if (leave.done) {
      ring = null;
      return null;
    }
    return { origin, hue, opacity: leave.opacity, scale: 1 };
  }

  function pulsing() {
    if (world.holding) return true;
    if (world.drag && ring) return true;
    if (!ring) return false;
    return ring.phase === "out" && performance.now() - ring.from < 80;
  }

  function sync() {
    const score = matchScore(world.hues, TARGET_HUES);
    hold.evaluate(world, !world.drag && score.matched);
    playFill ??= document.createElement("canvas");
    targetFill ??= document.createElement("canvas");
    if (play) drawPlay(play, playFill, world.hues, ringLook());
    if (target) drawTarget(target, targetFill);
    onHud({
      closeness: score.closeness,
      holding: world.holding,
      solved: world.solved,
    });
    if (pulsing() && !raf) {
      raf = requestAnimationFrame(() => {
        raf = 0;
        sync();
      });
    }
  }

  function observe(
    current: ResizeObserver | null,
    node: HTMLCanvasElement | null,
    assign: (value: HTMLCanvasElement | null) => void,
  ) {
    current?.disconnect();
    assign(node);
    if (!node) return null;
    const observer = new ResizeObserver(() => sync());
    observer.observe(node);
    sync();
    return observer;
  }

  return {
    bindPlay(node) {
      playObserver = observe(playObserver, node, (value) => {
        play = value;
      });
    },
    bindTarget(node) {
      targetObserver = observe(targetObserver, node, (value) => {
        target = value;
      });
    },
    onPointerDown(event) {
      if (!play) return;
      const box = playBox(play);
      const css = pointerToCss(event.nativeEvent, play);
      const hit = hitPlayVertex(css, box.width, box.height);
      if (!hit) return;
      try {
        play.setPointerCapture(event.nativeEvent.pointerId);
      } catch {
        /* synthetic pointer or already released */
      }
      world.drag = hit;
      ring = { vertex: hit, phase: "in", from: performance.now() };
      const hue = pointerHue(playToPx(TRIANGLE[hit], box.width, box.height), css);
      if (hue !== null) world.hues[hit] = hue;
      sync();
    },
    onPointerMove(event) {
      if (!play || !world.drag) return;
      const box = playBox(play);
      const css = pointerToCss(event.nativeEvent, play);
      const hue = pointerHue(
        playToPx(TRIANGLE[world.drag], box.width, box.height),
        css,
      );
      if (hue !== null) world.hues[world.drag] = hue;
      sync();
    },
    onPointerUp(event) {
      if (play?.hasPointerCapture(event.nativeEvent.pointerId)) {
        play.releasePointerCapture(event.nativeEvent.pointerId);
      }
      world.drag = null;
      if (ring) {
        ring = prefersReducedMotion()
          ? null
          : { vertex: ring.vertex, phase: "out", from: performance.now() };
      }
      sync();
    },
    reset() {
      const next = cloneWorld();
      world.hues = next.hues;
      world.drag = null;
      world.holding = false;
      world.holdFrom = 0;
      world.solved = false;
      ring = null;
      hold.stop();
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      sync();
    },
  };
}

export const INITIAL_COLOR_HUD: ColorHud = {
  closeness: matchScore(START_HUES, TARGET_HUES).closeness,
  holding: false,
  solved: false,
};
