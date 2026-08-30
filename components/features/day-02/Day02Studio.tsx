"use client";

import { ColorPanel } from "@/components/features/day-02/ColorPanel";
import { ColorStage } from "@/components/features/day-02/ColorStage";
import { useColorStudio } from "@/hooks/use-color-studio";

export function Day02Studio() {
  const { hud, studio } = useColorStudio();

  return (
    <div className="flex flex-1 flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
      <ColorStage studio={studio} solved={hud.solved} />
      <ColorPanel hud={hud} onReset={studio.reset} />
    </div>
  );
}
