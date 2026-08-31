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
  emptyTimes,
  FLASH_MS,
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

export function createRasterStudio(onHud: (hud: RasterHud) => void): RasterStudio {
  const world: RasterWorld = createWorld(0);
  let canvas: HTMLCanvasElement | null = null;
  let observer: ResizeObserver | null = null;
  let layout: GridLayout | null = null;
  let cells: Cell[] = [];
  let raf = 0;
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
      world.flashes = emptyTimes(count);
      world.solved = false;
      world.holding = false;
      world.holdFrom = 0;
    }
    return next;
  }

  function flashing(now: number) {
    return world.flashes.some((until) => until > now);
  }

  function sync() {
    if (!canvas) return;
    const next = fit();
    if (!next || !layout) return;
    const now = performance.now();
    const ready = allMatched(cells, world.lit) && !world.solved;
    hold.evaluate(world, ready);
    drawRaster(canvas, layout, cells, world.lit, world.flashes, now);
    onHud({ solved: world.solved, holding: world.holding });
    if ((world.holding || flashing(now)) && !raf) {
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
      const next = size();
      if (!next) return;
      const css = pointerToCss(event.nativeEvent, canvas);
      const cell = hitCell(css, layout, cells);
      if (!cell) return;
      if (cell.inside) {
        world.lit[cell.i] = !world.lit[cell.i];
      } else {
        world.lit[cell.i] = false;
        world.flashes[cell.i] = performance.now() + FLASH_MS;
      }
      try {
        canvas.setPointerCapture(event.nativeEvent.pointerId);
      } catch {
        /* already released */
      }
      sync();
    },
    reset() {
      world.lit = emptyFlags(cells.length);
      world.flashes = emptyTimes(cells.length);
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
