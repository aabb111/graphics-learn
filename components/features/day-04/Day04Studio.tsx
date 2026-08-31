"use client";

import { DepthPanel } from "@/components/features/day-04/DepthPanel";
import { DepthStage } from "@/components/features/day-04/DepthStage";
import { useDepthStudio } from "@/hooks/use-depth-studio";

export function Day04Studio() {
  const { hud, studio } = useDepthStudio();

  return (
    <div className="flex flex-1 flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
      <DepthStage studio={studio} solved={hud.solved} cursor={hud.cursor} />
      <DepthPanel hud={hud} onReset={studio.reset} />
    </div>
  );
}
