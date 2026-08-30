"use client";

import { cn } from "@/lib/utils";
import type { Studio } from "@/lib/geometry/studio";

type TriangleStageProps = {
  studio: Studio;
  holdHint?: boolean;
};

export function TriangleStage({ studio, holdHint }: TriangleStageProps) {
  const { bindCanvas, onPointerDown, onPointerMove, onPointerUp } = studio;

  return (
    <div className="flex flex-1 flex-col">
      <p className="mb-3 text-[14px] leading-6 text-muted-foreground">
        拖三个角。指针在三角形里滑动，看颜色怎么兑。
        {holdHint ? " 停在这儿。" : null}
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
