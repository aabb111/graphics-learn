"use client";

import { TransformPanel } from "@/components/features/day-05/TransformPanel";
import { TransformStage } from "@/components/features/day-05/TransformStage";
import { useTransformStudio } from "@/hooks/use-transform-studio";

export function Day05Studio() {
  const { hud, studio } = useTransformStudio();

  return (
    <div className="flex flex-1 flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
      <TransformStage studio={studio} solved={hud.solved} cursor={hud.cursor} />
      <TransformPanel hud={hud} onReset={studio.reset} />
    </div>
  );
}
