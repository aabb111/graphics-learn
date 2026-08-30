import { SAMPLE_R } from "@/lib/geometry/sample";
import type { Vec2 } from "@/lib/geometry/types";

export const TOUCH_LIFT = 44;
const LIFT_MS = 120;
const STEM_MS = 80;
const EDGE = SAMPLE_R + 2;

export type OffsetSide = "up" | "left" | "right";

export function offsetSide(contact: Vec2, width: number): OffsetSide {
  if (contact.y - TOUCH_LIFT >= EDGE) return "up";
  return width - contact.x > contact.x ? "right" : "left";
}

export function offsetVector(side: OffsetSide): Vec2 {
  if (side === "up") return { x: 0, y: -TOUCH_LIFT };
  if (side === "right") return { x: TOUCH_LIFT, y: 0 };
  return { x: -TOUCH_LIFT, y: 0 };
}

export function offsetFromContact(contact: Vec2, width: number): Vec2 {
  const off = offsetVector(offsetSide(contact, width));
  return { x: contact.x + off.x, y: contact.y + off.y };
}

type Phase = "idle" | "drag" | "out";

function easeOut(t: number) {
  return 1 - (1 - t) * (1 - t);
}

function lerp(from: Vec2, to: Vec2, t: number): Vec2 {
  return {
    x: from.x + (to.x - from.x) * t,
    y: from.y + (to.y - from.y) * t,
  };
}

function add(point: Vec2, off: Vec2): Vec2 {
  return { x: point.x + off.x, y: point.y + off.y };
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
  let fromOff: Vec2 = { x: 0, y: 0 };
  let toOff: Vec2 = { x: 0, y: 0 };
  let side: OffsetSide | null = null;
  let frozen: Vec2 | null = null;
  let tweenFrom = 0;
  let tweening = false;
  let width = 0;

  function currentOff() {
    if (!tweening) return toOff;
    const t = easeOut(Math.min(1, (performance.now() - tweenFrom) / LIFT_MS));
    if (t >= 1) {
      tweening = false;
      return toOff;
    }
    return lerp(fromOff, toOff, t);
  }

  function startTween(next: Vec2) {
    if (reducedMotion()) {
      fromOff = next;
      toOff = next;
      tweening = false;
      return;
    }
    fromOff = currentOff();
    toOff = next;
    tweenFrom = performance.now();
    tweening = true;
  }

  return {
    reset() {
      phase = "idle";
      contact = null;
      side = null;
      frozen = null;
      tweening = false;
    },
    active() {
      return phase !== "idle";
    },
    pulsing() {
      if (tweening) return true;
      if (phase === "out") return performance.now() - tweenFrom < STEM_MS;
      return false;
    },
    begin(sample: Vec2, point: Vec2) {
      contact = { ...point };
      fromOff = { x: sample.x - point.x, y: sample.y - point.y };
      toOff = fromOff;
      side = null;
      frozen = null;
      tweenFrom = performance.now();
      tweening = !reducedMotion();
      phase = "drag";
    },
    move(point: Vec2) {
      if (phase !== "drag") return;
      contact = { ...point };
    },
    end() {
      if (phase === "idle") return;
      if (contact) frozen = add(contact, currentOff());
      tweenFrom = performance.now();
      tweening = false;
      phase = reducedMotion() ? "idle" : "out";
      if (phase === "idle") contact = null;
    },
    place(nextWidth: number) {
      width = nextWidth;
      if (phase === "idle" || !contact) return null;
      if (phase === "out") return frozen;
      const nextSide = offsetSide(contact, width);
      const dest = offsetVector(nextSide);
      if (side === null) {
        side = nextSide;
        toOff = dest;
        if (reducedMotion()) {
          fromOff = dest;
          tweening = false;
        } else {
          tweenFrom = performance.now();
          tweening = true;
        }
      } else if (nextSide !== side) {
        side = nextSide;
        startTween(dest);
      }
      frozen = add(contact, currentOff());
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
        const opacity = Math.max(0, 1 - (performance.now() - tweenFrom) / STEM_MS);
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
