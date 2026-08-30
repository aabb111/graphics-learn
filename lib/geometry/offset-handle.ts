import { SAMPLE_R } from "@/lib/geometry/sample";
import type { Vec2 } from "@/lib/geometry/types";

export const TOUCH_LIFT = 44;
const LIFT_MS = 120;
const STEM_MS = 80;
const EDGE = SAMPLE_R + 2;

export function offsetFromContact(contact: Vec2, width: number): Vec2 {
  const up = { x: contact.x, y: contact.y - TOUCH_LIFT };
  if (up.y >= EDGE) return up;
  const rightRoom = width - contact.x;
  if (rightRoom > contact.x) {
    return { x: contact.x + TOUCH_LIFT, y: contact.y };
  }
  return { x: contact.x - TOUCH_LIFT, y: contact.y };
}

type Phase = "idle" | "in" | "drag" | "out";

function easeOut(t: number) {
  return 1 - (1 - t) * (1 - t);
}

function lerp(from: Vec2, to: Vec2, t: number): Vec2 {
  return {
    x: from.x + (to.x - from.x) * t,
    y: from.y + (to.y - from.y) * t,
  };
}

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isOffsetPointer(type: string) {
  return type === "touch" || type === "pen";
}

export function createOffsetHandle() {
  let phase: Phase = "idle";
  let contact: Vec2 | null = null;
  let liftFrom: Vec2 | null = null;
  let frozen: Vec2 | null = null;
  let from = 0;

  let canvas = { width: 0, height: 0 };

  function dest() {
    if (!contact) return null;
    return offsetFromContact(contact, canvas.width);
  }

  return {
    reset() {
      phase = "idle";
      contact = null;
      liftFrom = null;
      frozen = null;
    },
    active() {
      return phase !== "idle";
    },
    pulsing() {
      if (phase === "in") return performance.now() - from < LIFT_MS;
      if (phase === "out") return performance.now() - from < STEM_MS;
      return false;
    },
    begin(sample: Vec2, point: Vec2) {
      contact = { ...point };
      liftFrom = { ...sample };
      frozen = null;
      from = performance.now();
      phase = reducedMotion() ? "drag" : "in";
    },
    move(point: Vec2) {
      if (phase !== "in" && phase !== "drag") return;
      contact = { ...point };
    },
    end() {
      if (phase === "idle") return;
      from = performance.now();
      phase = reducedMotion() ? "idle" : "out";
      if (phase === "idle") contact = null;
    },
    place(width: number, height: number): Vec2 | null {
      canvas = { width, height };
      if (phase === "idle") return null;
      if (phase === "out") return frozen;
      const to = dest();
      if (!to || !liftFrom) return frozen;
      if (phase === "drag") {
        frozen = to;
        return to;
      }
      const t = easeOut(Math.min(1, (performance.now() - from) / LIFT_MS));
      if (t >= 1) phase = "drag";
      frozen = lerp(liftFrom, to, t);
      return frozen;
    },
    stem() {
      if (!contact || phase === "idle") return null;
      if (phase === "out") {
        if (reducedMotion()) {
          phase = "idle";
          contact = null;
          return null;
        }
        const opacity = Math.max(0, 1 - (performance.now() - from) / STEM_MS);
        if (opacity <= 0) {
          phase = "idle";
          contact = null;
          return null;
        }
        return { contact, opacity };
      }
      return { contact, opacity: 1 };
    },
  };
}
