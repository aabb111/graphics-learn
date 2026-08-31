"use client";

import { useState } from "react";

import {
  createRasterStudio,
  INITIAL_HUD,
  type RasterHud,
} from "@/lib/day-03/studio";

export function useRasterStudio() {
  const [hud, setHud] = useState<RasterHud>(INITIAL_HUD);
  const [studio] = useState(() => createRasterStudio(setHud));
  return { hud, studio };
}
