import type { PointerEvent } from "react";

import {
  barycentric,
  isInside,
  mixColor,
  toPx,
} from "@/lib/geometry/barycentric";
import { VERTEX_RGB } from "@/lib/geometry/colors";
import { drawScene } from "@/lib/geometry/draw-scene";
import { hitPoint, pointerToCss } from "@/lib/geometry/hit";
import { createHoldWatch, holdFill } from "@/lib/geometry/hold";
import { createOffsetHandle, isOffsetPointer } from "@/lib/geometry/offset-handle";
import {
  clampToTriangle,
  inTargetRing,
  SAMPLE_HIT_R,
  spawnSample,
} from "@/lib/geometry/sample";
import type { Barycentric, RGB } from "@/lib/geometry/types";
import {
  centroidOf,
  cloneWorld,
  DEFAULT_WORLD,
  type World,
} from "@/lib/geometry/world";

export type StudioHud = {
  alpha: number;
  beta: number;
  gamma: number;
  inside: boolean;
  degenerate: boolean;
  mix: RGB;
  solved: boolean;
  holding: boolean;
};

export type Studio = {
  bindCanvas: (node: HTMLCanvasElement | null) => void;
  onPointerDown: (event: PointerEvent<HTMLCanvasElement>) => void;
  onPointerMove: (event: PointerEvent<HTMLCanvasElement>) => void;
  onPointerUp: (event: PointerEvent<HTMLCanvasElement>) => void;
  onPointerCancel: (event: PointerEvent<HTMLCanvasElement>) => void;
  reset: () => void;
};

const WIN_BEAT_MS = 220;

function hudFrom(bc: Barycentric, world: World): StudioHud {
  return {
    alpha: bc.alpha,
    beta: bc.beta,
    gamma: bc.gamma,
    inside: isInside(bc),
    degenerate: bc.degenerate,
    mix: mixColor(bc, VERTEX_RGB.a, VERTEX_RGB.b, VERTEX_RGB.c),
    solved: world.solved,
    holding: world.holding,
  };
}

function layout(world: World, width: number, height: number) {
  const a = toPx(world.a, width, height);
  const b = toPx(world.b, width, height);
  const c = toPx(world.c, width, height);
  const sample = toPx(world.sample, width, height);
  const centroid = toPx(centroidOf(world.a, world.b, world.c), width, height);
  return {
    a,
    b,
    c,
    sample,
    centroid,
    bc: barycentric(sample, a, b, c),
  };
}

export function createStudio(onHud: (hud: StudioHud) => void): Studio {
  const world: World = cloneWorld();
  let fill: HTMLCanvasElement | null = null;
  let canvas: HTMLCanvasElement | null = null;
  let observer: ResizeObserver | null = null;
  let raf = 0;
  let grab = { x: 0, y: 0 };
  let winFrom = 0;
  const hold = createHoldWatch(() => sync());
  const offset = createOffsetHandle();

  function size() {
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  }

  function paintCursor(over: boolean) {
    if (!canvas) return;
    canvas.style.cursor = world.dragging ? "grabbing" : over ? "grab" : "default";
  }

  function sync() {
    if (!canvas) return;
    const next = size();
    if (!next || next.width < 8 || next.height < 8) return;
    fill ??= document.createElement("canvas");
    const lifted = offset.place(next.width);
    if (lifted) {
      world.sample = { x: lifted.x / next.width, y: lifted.y / next.height };
    }
    const { a, b, c, sample, centroid, bc } = layout(world, next.width, next.height);
    const ready = inTargetRing(sample, centroid) && !world.dragging && !bc.degenerate;
    hold.evaluate(world, ready);
    if (world.solved && !winFrom) winFrom = performance.now();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const winBeat = world.solved
      ? reduced
        ? 1
        : Math.min(1, (performance.now() - winFrom) / WIN_BEAT_MS)
      : 0;
    const mix = mixColor(bc, VERTEX_RGB.a, VERTEX_RGB.b, VERTEX_RGB.c);
    const ringFill =
      ready && !world.solved ? (reduced ? 1 : holdFill(world)) : 0;
    drawScene(
      canvas,
      fill,
      { a, b, c, sample },
      mix,
      ringFill,
      world.solved,
      winBeat,
      offset.stem(),
    );
    onHud(hudFrom(bc, world));
    if ((world.holding || (world.solved && winBeat < 1) || offset.pulsing()) && !raf) {
      raf = requestAnimationFrame(() => {
        raf = 0;
        sync();
      });
    }
  }

  function place(event: PointerEvent<HTMLCanvasElement>) {
    const next = size();
    if (!next || !canvas) return null;
    return { css: pointerToCss(event.nativeEvent, canvas), next };
  }

  function lift(id: number) {
    if (canvas?.hasPointerCapture(id)) canvas.releasePointerCapture(id);
    if (offset.active()) offset.end();
    world.dragging = false;
    sync();
  }

  return {
    bindCanvas(node) {
      observer?.disconnect();
      observer = null;
      canvas = node;
      if (!node) return;
      observer = new ResizeObserver(() => sync());
      observer.observe(node);
      sync();
    },
    onPointerDown(event) {
      const placed = place(event);
      if (!placed || !canvas) return;
      const { sample } = layout(world, placed.next.width, placed.next.height);
      if (!hitPoint(placed.css, sample, SAMPLE_HIT_R)) {
        paintCursor(false);
        return;
      }
      if (isOffsetPointer(event.nativeEvent.pointerType)) {
        offset.begin(sample, placed.css);
      } else {
        grab = { x: placed.css.x - sample.x, y: placed.css.y - sample.y };
      }
      world.dragging = true;
      paintCursor(true);
      try {
        canvas.setPointerCapture(event.nativeEvent.pointerId);
      } catch {
        /* already released */
      }
      sync();
    },
    onPointerMove(event) {
      const placed = place(event);
      if (!placed) return;
      const { a, b, c, sample } = layout(world, placed.next.width, placed.next.height);
      if (world.dragging && offset.active()) {
        offset.move(placed.css);
      } else if (world.dragging) {
        const next = clampToTriangle(
          { x: placed.css.x - grab.x, y: placed.css.y - grab.y },
          a,
          b,
          c,
        );
        world.sample = {
          x: next.x / placed.next.width,
          y: next.y / placed.next.height,
        };
      }
      paintCursor(world.dragging || hitPoint(placed.css, sample, SAMPLE_HIT_R));
      sync();
    },
    onPointerUp(event) {
      lift(event.nativeEvent.pointerId);
    },
    onPointerCancel(event) {
      lift(event.nativeEvent.pointerId);
    },
    reset() {
      const next = cloneWorld();
      world.sample = spawnSample(next.a, next.b, next.c);
      offset.reset();
      world.dragging = false;
      world.holding = false;
      world.holdFrom = 0;
      world.solved = false;
      winFrom = 0;
      hold.stop();
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      paintCursor(false);
      sync();
    },
  };
}

const start = layout(DEFAULT_WORLD, 100, 100);

export const INITIAL_HUD = hudFrom(start.bc, DEFAULT_WORLD);
