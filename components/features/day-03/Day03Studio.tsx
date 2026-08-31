"use client";

import { RasterPanel } from "@/components/features/day-03/RasterPanel";
import { RasterStage } from "@/components/features/day-03/RasterStage";
import { useRasterStudio } from "@/hooks/use-raster-studio";

export function Day03Studio() {
  const { hud, studio } = useRasterStudio();

  return (
    <div className="flex flex-1 flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
      <RasterStage studio={studio} solved={hud.solved} />
      <RasterPanel hud={hud} onReset={studio.reset} />
    </div>
  );
}
