"use client";

import { CoordPanel } from "@/components/features/day-01/CoordPanel";
import { TriangleStage } from "@/components/features/day-01/TriangleStage";
import { useTriangleStudio } from "@/hooks/use-triangle-studio";

export function Day01Studio() {
  const { hud, studio } = useTriangleStudio();

  return (
    <div className="flex flex-1 flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
      <TriangleStage studio={studio} solved={hud.solved} />
      <CoordPanel hud={hud} onReset={studio.reset} />
    </div>
  );
}
