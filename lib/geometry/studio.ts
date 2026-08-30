import type { PointerEvent } from "react";

import {
  barycentric,
  isInside,
  mixColor,
  signedArea,
  toPx,
} from "@/lib/geometry/barycentric";
import { VERTEX_RGB } from "@/lib/geometry/colors";
import { drawScene } from "@/lib/geometry/draw-scene";
import { draggedPast, holdReady } from "@/lib/geometry/drag-arm";
import { hitTarget, pointerToCss } from "@/lib/geometry/hit";
import { createHoldWatch, holdFill } from "@/lib/geometry/hold";
import type { Barycentric, RGB, VertexId } from "@/lib/geometry/types";
import {
  centroidOf,
  clampNorm,
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
  reset: () => void;
};

const MIN_AREA = 0.045;

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

function weightsAtCentroid(world: World, width: number, height: number) {
  const a = toPx(world.a, width, height);
  const b = toPx(world.b, width, height);
  const c = toPx(world.c, width, height);
  return {
    a,
    b,
    c,
    bc: barycentric(toPx(centroidOf(world.a, world.b, world.c), width, height), a, b, c),
  };
}

export function createStudio(onHud: (hud: StudioHud) => void): Studio {
  const world: World = cloneWorld();
  let fill: HTMLCanvasElement | null = null;
  let canvas: HTMLCanvasElement | null = null;
  let observer: ResizeObserver | null = null;
  let raf = 0;
  let grab = { x: 0, y: 0 };
  let pressVertex = { x: 0, y: 0 };
  let released = false;
  const hold = createHoldWatch(() => sync());

  function size() {
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  }

  function sync() {
    if (!canvas) return;
    const next = size();
    if (!next || next.width < 8 || next.height < 8) return;
    fill ??= document.createElement("canvas");
    const { a, b, c, bc } = weightsAtCentroid(world, next.width, next.height);
    const ready = holdReady({
      armed: world.armed,
      released,
      dragging: Boolean(world.drag),
      degenerate: bc.degenerate,
    });
    hold.evaluate(world, ready);
    drawScene(canvas, fill, { a, b, c }, ready || world.solved ? holdFill(world) : 0);
    onHud(hudFrom(bc, world));
    if (world.holding && !raf) {
      raf = requestAnimationFrame(() => {
        raf = 0;
        sync();
      });
    }
  }

  function place(event: PointerEvent<HTMLCanvasElement>) {
    const next = size();
    if (!next) return null;
    return { css: pointerToCss(event.nativeEvent, canvas!), next };
  }

  function moveVertex(id: VertexId, css: { x: number; y: number }, width: number, height: number) {
    const norm = {
      x: clampNorm((css.x - grab.x) / width),
      y: clampNorm((css.y - grab.y) / height),
    };
    const draft = { ...world, [id]: norm };
    if (Math.abs(signedArea(draft.a, draft.b, draft.c)) < MIN_AREA) return;
    world[id] = norm;
    if (draggedPast(pressVertex, { x: norm.x * width, y: norm.y * height })) {
      world.armed = true;
    }
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
      const { a, b, c } = weightsAtCentroid(world, placed.next.width, placed.next.height);
      const hit = hitTarget(placed.css, { a, b, c });
      if (!hit) return;
      const origin = hit === "a" ? a : hit === "b" ? b : c;
      grab = { x: placed.css.x - origin.x, y: placed.css.y - origin.y };
      pressVertex = { x: origin.x, y: origin.y };
      canvas.setPointerCapture(event.nativeEvent.pointerId);
      world.drag = hit;
      sync();
    },
    onPointerMove(event) {
      const placed = place(event);
      if (!placed || !world.drag) return;
      moveVertex(world.drag, placed.css, placed.next.width, placed.next.height);
      sync();
    },
    onPointerUp(event) {
      if (canvas?.hasPointerCapture(event.nativeEvent.pointerId)) {
        canvas.releasePointerCapture(event.nativeEvent.pointerId);
      }
      if (world.armed) released = true;
      world.drag = null;
      sync();
    },
    reset() {
      const next = cloneWorld();
      world.a = next.a;
      world.b = next.b;
      world.c = next.c;
      world.armed = false;
      released = false;
      world.drag = null;
      world.holding = false;
      world.holdFrom = 0;
      world.solved = false;
      hold.stop();
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      sync();
    },
  };
}

export const INITIAL_HUD = hudFrom(
  barycentric(
    toPx(centroidOf(DEFAULT_WORLD.a, DEFAULT_WORLD.b, DEFAULT_WORLD.c), 100, 100),
    toPx(DEFAULT_WORLD.a, 100, 100),
    toPx(DEFAULT_WORLD.b, 100, 100),
    toPx(DEFAULT_WORLD.c, 100, 100),
  ),
  DEFAULT_WORLD,
);
