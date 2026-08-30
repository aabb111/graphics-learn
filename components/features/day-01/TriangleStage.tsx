"use client";

import { cn } from "@/lib/utils";
import type { Studio } from "@/lib/geometry/studio";

type TriangleStageProps = {
  studio: Studio;
  solved: boolean;
};

export function TriangleStage({ studio, solved }: TriangleStageProps) {
  const { bindCanvas, onPointerDown, onPointerMove, onPointerUp, onPointerCancel } =
    studio;

  return (
    <div className="flex flex-1 flex-col">
      {solved ? null : (
        <p className="mb-3 text-[14px] leading-6 text-foreground break-keep">
          把三个角都拖一下，再看中间三个数。
        </p>
      )}
      <canvas
        ref={bindCanvas}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        className={cn(
          "h-[min(58vh,560px)] w-full touch-none bg-[#F4F4F2]",
          "cursor-grab active:cursor-grabbing rounded-sm border border-border/80",
        )}
        aria-label="把三个角都拖一下，再看中间三个数"
      />
    </div>
  );
}
