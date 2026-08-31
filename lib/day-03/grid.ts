import { barycentric, isInside, toPx } from "@/lib/geometry/barycentric";
import type { Vec2 } from "@/lib/geometry/types";

import { CELL, TRI } from "@/lib/day-03/world";

export type GridLayout = {
  cols: number;
  rows: number;
  originX: number;
  originY: number;
  width: number;
  height: number;
  a: Vec2;
  b: Vec2;
  c: Vec2;
};

export type Cell = {
  i: number;
  col: number;
  row: number;
  x: number;
  y: number;
  cx: number;
  cy: number;
  inside: boolean;
};

export function layoutGrid(width: number, height: number): GridLayout {
  const cols = Math.max(1, Math.floor(width / CELL));
  const rows = Math.max(1, Math.floor(height / CELL));
  return {
    cols,
    rows,
    originX: (width - cols * CELL) / 2,
    originY: (height - rows * CELL) / 2,
    width,
    height,
    a: toPx(TRI.a, width, height),
    b: toPx(TRI.b, width, height),
    c: toPx(TRI.c, width, height),
  };
}

export function buildCells(layout: GridLayout): Cell[] {
  const { cols, rows, originX, originY, a, b, c } = layout;
  const cells: Cell[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = originX + col * CELL;
      const y = originY + row * CELL;
      const cx = x + CELL / 2;
      const cy = y + CELL / 2;
      const bc = barycentric({ x: cx, y: cy }, a, b, c);
      cells.push({
        i: row * cols + col,
        col,
        row,
        x,
        y,
        cx,
        cy,
        inside: isInside(bc, 1e-4),
      });
    }
  }
  return cells;
}

export function hitCell(point: Vec2, layout: GridLayout, cells: Cell[]) {
  const col = Math.floor((point.x - layout.originX) / CELL);
  const row = Math.floor((point.y - layout.originY) / CELL);
  if (col < 0 || row < 0 || col >= layout.cols || row >= layout.rows) {
    return null;
  }
  return cells[row * layout.cols + col] ?? null;
}

export function insideCells(cells: Cell[]) {
  return cells.filter((cell) => cell.inside);
}

export function allMatched(cells: Cell[], lit: boolean[]) {
  const insides = insideCells(cells);
  if (insides.length === 0) return false;
  if (insides.some((cell) => !lit[cell.i])) return false;
  return cells.every((cell) => !cell.inside || lit[cell.i]);
}
