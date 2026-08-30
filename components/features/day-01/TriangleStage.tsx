"use client";

import { cn } from "@/lib/utils";
import type { Studio } from "@/lib/geometry/studio";

type TriangleStageProps = {
  studio: Studio;
};

export function TriangleStage({ studio }: TriangleStageProps) {
  const { bindCanvas, onPointerDown, onPointerMove, onPointerUp } = studio;

  return (
    <div className="flex flex-1 flex-col">
      <p className="mb-3 text-[14px] leading-6 text-foreground">
        过关：把取样点拖到淡蓝圈上（三角形正中），停约 1 秒。三个角能拖，但不决定过关。点一下取样点就能钉住。
      </p>
      <canvas
        ref={bindCanvas}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className={cn(
          "h-[min(58vh,560px)] w-full touch-none bg-[#F4F4F2]",
          "cursor-grab active:cursor-grabbing rounded-sm border border-border/80",
        )}
        aria-label="可拖拽顶点的三角形画布"
      />
    </div>
  );
}
