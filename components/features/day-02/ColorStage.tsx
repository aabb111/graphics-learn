"use client";

import { cn } from "@/lib/utils";
import type { ColorStudio } from "@/lib/day-02/studio";

type ColorStageProps = {
  studio: ColorStudio;
};

export function ColorStage({ studio }: ColorStageProps) {
  const { bindPlay, bindTarget, onPointerDown, onPointerMove, onPointerUp } =
    studio;

  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <p className="mb-3 text-[14px] leading-6 text-muted-foreground">
        拖三个顶点上的颜色，让三角里的渐变对上右边的目标。
      </p>
      <div className="flex items-start gap-5 pt-6">
        <canvas
          ref={bindPlay}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className={cn(
            "aspect-[4/3] min-w-0 flex-1 touch-none bg-[#F4F4F2]",
            "cursor-grab active:cursor-grabbing rounded-sm border border-border/80",
          )}
          aria-label="可调顶点颜色的三角形"
        />
        <div className="relative w-[40%] shrink-0">
          <p className="absolute top-0 -translate-y-full pb-2 text-[11px] tracking-[0.16em] text-muted-foreground">
            目标
          </p>
          <canvas
            ref={bindTarget}
            className="aspect-[4/3] w-full bg-[#F4F4F2] rounded-sm border border-border/80"
            aria-label="目标三角形"
          />
        </div>
      </div>
    </div>
  );
}
