"use client";

import { useState } from "react";

import {
  createTransformStudio,
  INITIAL_HUD,
  type TransformHud,
} from "@/lib/day-05/studio";

export function useTransformStudio() {
  const [hud, setHud] = useState<TransformHud>(INITIAL_HUD);
  const [studio] = useState(() => createTransformStudio(setHud));
  return { hud, studio };
}
