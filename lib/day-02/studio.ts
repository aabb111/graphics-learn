import type { PointerEvent } from "react";

import { drawPlay, drawTarget, huesToColors } from "@/lib/day-02/draw";
import { createHoldWatch } from "@/lib/geometry/hold";
import { pointerHue } from "@/lib/day-02/hue";
import { matchScore } from "@/lib/day-02/match";
import { cloneWorld, TARGET_HUES, TRIANGLE } from "@/lib/day-02/world";
import { toPx } from "@/lib/geometry/barycentric";
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

const HIT_R = 28;

function hitVertex(
  point: { x: number; y: number },
  width: number,
  height: number,
): VertexId | null {
  for (const id of ["a", "b", "c"] as VertexId[]) {
    const vertex = toPx(TRIANGLE[id], width, height);
    if (Math.hypot(point.x - vertex.x, point.y - vertex.y) <= HIT_R) return id;
  }
  return null;
}

export function createColorStudio(onHud: (hud: ColorHud) => void): ColorStudio {
  const world = cloneWorld();
  let playFill: HTMLCanvasElement | null = null;
  let targetFill: HTMLCanvasElement | null = null;
  let play: HTMLCanvasElement | null = null;
  let target: HTMLCanvasElement | null = null;
  let playObserver: ResizeObserver | null = null;
  let targetObserver: ResizeObserver | null = null;
  const hold = createHoldWatch(() => sync());

  function sync() {
    const score = matchScore(huesToColors(world.hues), huesToColors(TARGET_HUES));
    hold.evaluate(world, score.matched);
    playFill ??= document.createElement("canvas");
    targetFill ??= document.createElement("canvas");
    if (play) drawPlay(play, playFill, world.hues, world.drag);
    if (target) drawTarget(target, targetFill);
    onHud({
      closeness: score.closeness,
      holding: world.holding,
      solved: world.solved,
    });
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
      const rect = play.getBoundingClientRect();
      const css = pointerToCss(event.nativeEvent, play);
      const hit = hitVertex(css, rect.width, rect.height);
      if (!hit) return;
      try {
        play.setPointerCapture(event.nativeEvent.pointerId);
      } catch {
        /* synthetic pointer or already released */
      }
      world.drag = hit;
      const hue = pointerHue(toPx(TRIANGLE[hit], rect.width, rect.height), css);
      if (hue !== null) world.hues[hit] = hue;
      sync();
    },
    onPointerMove(event) {
      if (!play || !world.drag) return;
      const rect = play.getBoundingClientRect();
      const css = pointerToCss(event.nativeEvent, play);
      const hue = pointerHue(
        toPx(TRIANGLE[world.drag], rect.width, rect.height),
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
      sync();
    },
    reset() {
      const next = cloneWorld();
      world.hues = next.hues;
      world.drag = null;
      world.holding = false;
      world.holdFrom = 0;
      world.solved = false;
      hold.stop();
      sync();
    },
  };
}

export const INITIAL_COLOR_HUD: ColorHud = {
  closeness: 0,
  holding: false,
  solved: false,
};
