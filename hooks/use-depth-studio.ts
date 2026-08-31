"use client";

import { useState } from "react";

import {
  createDepthStudio,
  INITIAL_HUD,
  type DepthHud,
} from "@/lib/day-04/studio";

export function useDepthStudio() {
  const [hud, setHud] = useState<DepthHud>(INITIAL_HUD);
  const [studio] = useState(() => createDepthStudio(setHud));
  return { hud, studio };
}
