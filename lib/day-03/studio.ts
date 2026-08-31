import type { PointerEvent } from "react";

import { drawRaster } from "@/lib/day-03/draw";
import {
  allMatched,
  buildCells,
  hitCell,
  layoutGrid,
  type Cell,
  type GridLayout,
} from "@/lib/day-03/grid";
import {
  createWorld,
  emptyFlags,
  emptyLevels,
  lightAt,
  stillTweening,
  type RasterWorld,
} from "@/lib/day-03/world";
import { pointerToCss } from "@/lib/geometry/hit";
import { createHoldWatch } from "@/lib/geometry/hold";

export type RasterHud = {
  solved: boolean;
  holding: boolean;
};

export type RasterStudio = {
  bindCanvas: (node: HTMLCanvasElement | null) => void;
  onPointerDown: (event: PointerEvent<HTMLCanvasElement>) => void;
  reset: () => void;
};

export const INITIAL_HUD: RasterHud = { solved: false, holding: false };

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function createRasterStudio(onHud: (hud: RasterHud) => void): RasterStudio {
  const world: RasterWorld = createWorld(0);
  let canvas: HTMLCanvasElement | null = null;
  let observer: ResizeObserver | null = null;
  let layout: GridLayout | null = null;
  let cells: Cell[] = [];
  let raf = 0;
  let progressed = false;
  const hold = createHoldWatch(() => sync());

  function size() {
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  }

  function fit() {
    const next = size();
    if (!next || next.width < 8 || next.height < 8) return null;
    const grid = layoutGrid(next.width, next.height);
    const count = grid.cols * grid.rows;
    const resized = !layout || layout.cols !== grid.cols || layout.rows !== grid.rows;
    layout = grid;
    cells = buildCells(grid);
    if (resized) {
      world.lit = emptyFlags(count);
      world.from = emptyLevels(count);
      world.started = emptyLevels(count);
      world.solved = false;
      world.holding = false;
      world.holdFrom = 0;
      progressed = false;
      hold.stop();
    }
    return next;
  }

  function lights(now: number, reduced: boolean) {
    return cells.map((cell) => lightAt(world, cell.i, now, reduced));
  }

  function sync() {
    if (!canvas) return;
    const next = fit();
    if (!next || !layout) return;
    const now = performance.now();
    const reduced = reducedMotion();
    const ready = progressed && allMatched(cells, world.lit) && !world.solved;
    hold.evaluate(world, ready);
    drawRaster(canvas, layout, cells, lights(now, reduced));
    onHud({ solved: world.solved, holding: world.holding });
    if ((world.holding || stillTweening(world, now, reduced)) && !raf) {
      raf = requestAnimationFrame(() => {
        raf = 0;
        sync();
      });
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
      if (world.solved || !canvas || !layout) return;
      event.preventDefault();
      const css = pointerToCss(event.nativeEvent, canvas);
      const cell = hitCell(css, layout, cells);
      if (!cell || !cell.inside) return;
      const now = performance.now();
      const reduced = reducedMotion();
      world.from[cell.i] = lightAt(world, cell.i, now, reduced);
      world.lit[cell.i] = !world.lit[cell.i];
      world.started[cell.i] = now;
      if (world.lit[cell.i]) progressed = true;
      sync();
    },
    reset() {
      world.lit = emptyFlags(cells.length);
      world.from = emptyLevels(cells.length);
      world.started = emptyLevels(cells.length);
      world.holding = false;
      world.holdFrom = 0;
      world.solved = false;
      progressed = false;
      hold.stop();
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      sync();
    },
  };
}
