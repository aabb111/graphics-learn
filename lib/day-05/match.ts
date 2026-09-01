import { wrapAngle } from "@/lib/day-05/transform";
import { GHOST, type Trs } from "@/lib/day-05/world";

export const POS_EPS = 18;
export const ANGLE_EPS = 0.1;
export const SCALE_EPS = 0.08;

export function trsMatch(play: Trs, width: number, height: number) {
  const dx = (play.cx - GHOST.cx) * width;
  const dy = (play.cy - GHOST.cy) * height;
  const dPos = Math.hypot(dx, dy);
  const dAngle = Math.abs(wrapAngle(play.rotation - GHOST.rotation));
  const dScale = Math.abs(play.scale - GHOST.scale);
  return dPos <= POS_EPS && dAngle <= ANGLE_EPS && dScale <= SCALE_EPS;
}
