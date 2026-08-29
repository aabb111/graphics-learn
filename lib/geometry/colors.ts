import type { RGB } from "@/lib/geometry/types";

export const VERTEX_RGB: Record<"a" | "b" | "c", RGB> = {
  a: [47, 79, 224],
  b: [226, 75, 59],
  c: [214, 168, 34],
};

export const VERTEX_HEX = {
  a: "#2F4FE0",
  b: "#E24B3B",
  c: "#D6A822",
} as const;

export function rgbToCss(rgb: RGB, alpha = 1) {
  const [r, g, b] = rgb;
  if (alpha >= 1) {
    return `rgb(${Math.round(r)} ${Math.round(g)} ${Math.round(b)})`;
  }
  return `rgb(${Math.round(r)} ${Math.round(g)} ${Math.round(b)} / ${alpha})`;
}
