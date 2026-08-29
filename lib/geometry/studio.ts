import type { PointerEvent } from "react";

import {
  barycentric,
  isInside,
  isNearCenter,
  mixColor,
  signedArea,
  toPx,
} from "@/lib/geometry/barycentric";
import { VERTEX_RGB } from "@/lib/geometry/colors";
import { drawScene } from "@/lib/geometry/draw-scene";
import { hitTarget, pointerToCss } from "@/lib/geometry/hit";
import type { Barycentric, RGB } from "@/lib/geometry/types";
import {
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
  pinned: boolean;
};

export type Studio = {
  bindCanvas: (node: HTMLCanvasElement | null) => void;
  onPointerDown: (event: PointerEvent<HTMLCanvasElement>) => void;
  onPointerMove: (event: PointerEvent<HTMLCanvasElement>) => void;
  onPointerUp: (event: PointerEvent<HTMLCanvasElement>) => void;
  reset: () => void;
  togglePin: () => void;
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
    pinned: world.pinned,
  };
}

export function createStudio(onHud: (hud: StudioHud) => void): Studio {
  const world: World = cloneWorld();
  let fill: HTMLCanvasElement | null = null;
  let canvas: HTMLCanvasElement | null = null;
  let observer: ResizeObserver | null = null;

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
    const a = toPx(world.a, next.width, next.height);
    const b = toPx(world.b, next.width, next.height);
    const c = toPx(world.c, next.width, next.height);
    const probe = toPx(world.probe, next.width, next.height);
    const bc = barycentric(probe, a, b, c);
    if (isNearCenter(bc)) world.solved = true;
    drawScene(canvas, fill, { a, b, c, probe }, bc, isInside(bc));
    onHud(hudFrom(bc, world));
  }

  function place(event: PointerEvent<HTMLCanvasElement>) {
    const next = size();
    if (!next) return null;
    const css = pointerToCss(event.nativeEvent, canvas!);
    return {
      css,
      next,
      norm: {
        x: clampNorm(css.x / next.width),
        y: clampNorm(css.y / next.height),
      },
    };
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
      canvas.setPointerCapture(event.nativeEvent.pointerId);
      const hit = hitTarget(placed.css, {
        a: toPx(world.a, placed.next.width, placed.next.height),
        b: toPx(world.b, placed.next.width, placed.next.height),
        c: toPx(world.c, placed.next.width, placed.next.height),
      }, toPx(world.probe, placed.next.width, placed.next.height));
      if (hit === "a" || hit === "b" || hit === "c") {
        world.drag = hit;
        world.pinned = true;
      } else {
        world.drag = "probe";
        world.pinned = true;
        world.probe = placed.norm;
      }
      sync();
    },
    onPointerMove(event) {
      const placed = place(event);
      if (!placed) return;
      if (world.drag === "a" || world.drag === "b" || world.drag === "c") {
        const draft = { ...world, [world.drag]: placed.norm };
        if (Math.abs(signedArea(draft.a, draft.b, draft.c)) >= MIN_AREA) {
          world[world.drag] = placed.norm;
        }
      } else if (world.drag === "probe" || !world.pinned) {
        world.probe = placed.norm;
      }
      sync();
    },
    onPointerUp(event) {
      if (canvas?.hasPointerCapture(event.nativeEvent.pointerId)) {
        canvas.releasePointerCapture(event.nativeEvent.pointerId);
      }
      world.drag = null;
      sync();
    },
    reset() {
      const next = cloneWorld();
      world.a = next.a;
      world.b = next.b;
      world.c = next.c;
      world.probe = next.probe;
      world.pinned = false;
      world.drag = null;
      sync();
    },
    togglePin() {
      world.pinned = !world.pinned;
      sync();
    },
  };
}

export const INITIAL_HUD = hudFrom(
  barycentric(
    toPx(DEFAULT_WORLD.probe, 100, 100),
    toPx(DEFAULT_WORLD.a, 100, 100),
    toPx(DEFAULT_WORLD.b, 100, 100),
    toPx(DEFAULT_WORLD.c, 100, 100),
  ),
  DEFAULT_WORLD,
);
