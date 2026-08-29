"use client";

import { cn } from "@/lib/utils";
import type { Studio } from "@/lib/geometry/studio";

type TriangleStageProps = {
  studio: Studio;
};

export function TriangleStage({ studio }: TriangleStageProps) {
  const { bindCanvas, onPointerDown, onPointerMove, onPointerUp } = studio;

  return (
    <div className="flex min-h-[420px] flex-1 flex-col">
      <p className="mb-3 text-[12px] leading-6 text-muted-foreground">
        拖三个角。指针在三角形里移动，看重心坐标和颜色怎么变。
      </p>
      <canvas
        ref={bindCanvas}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className={cn(
          "h-[min(68vh,640px)] w-full touch-none bg-white",
          "cursor-crosshair rounded-sm border border-border/80",
        )}
        aria-label="可拖拽顶点的三角形画布"
      />
    </div>
  );
}
