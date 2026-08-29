"use client";

import { useState } from "react";
import {
  createStudio,
  INITIAL_HUD,
  type StudioHud,
} from "@/lib/geometry/studio";

export function useTriangleStudio() {
  const [hud, setHud] = useState<StudioHud>(INITIAL_HUD);
  const [studio] = useState(() => createStudio(setHud));

  return { hud, studio };
}
