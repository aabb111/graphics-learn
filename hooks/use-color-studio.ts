"use client";

import { useState } from "react";
import {
  createColorStudio,
  INITIAL_COLOR_HUD,
  type ColorHud,
} from "@/lib/day-02/studio";

export function useColorStudio() {
  const [hud, setHud] = useState<ColorHud>(INITIAL_COLOR_HUD);
  const [studio] = useState(() => createColorStudio(setHud));
  return { hud, studio };
}
