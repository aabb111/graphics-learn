import type { RGB, Vec2 } from "@/lib/geometry/types";

export function hslToRgb(h: number, s = 0.7, l = 0.5): RGB {
  const hue = ((h % 360) + 360) % 360;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;
  if (hue < 60) [r, g, b] = [c, x, 0];
  else if (hue < 120) [r, g, b] = [x, c, 0];
  else if (hue < 180) [r, g, b] = [0, c, x];
  else if (hue < 240) [r, g, b] = [0, x, c];
  else if (hue < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  ];
}

export function pointerHue(origin: Vec2, pointer: Vec2) {
  const dx = pointer.x - origin.x;
  const dy = pointer.y - origin.y;
  if (Math.hypot(dx, dy) < 6) return null;
  const deg = (Math.atan2(dy, dx) * 180) / Math.PI;
  return (deg + 360) % 360;
}

export function rgbToCss(rgb: RGB) {
  return `rgb(${rgb[0]} ${rgb[1]} ${rgb[2]})`;
}
