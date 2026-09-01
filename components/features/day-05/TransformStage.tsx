"use client";

import type { PointerEvent, SyntheticEvent } from "react";

import { cn } from "@/lib/utils";
import type { TransformHud, TransformStudio } from "@/lib/day-05/studio";

type TransformStageProps = {
  studio: TransformStudio;
  solved: boolean;
  cursor: TransformHud["cursor"];
};

function blockSelect(event: SyntheticEvent) {
  event.preventDefault();
}

const ENTER = "拖三角挪位置。边上转，角上拉大小。";

export function TransformStage({ studio, solved, cursor }: TransformStageProps) {
  const { bindCanvas, onPointerDown, onPointerMove, onPointerUp, onPointerLeave } =
    studio;

  function down(event: PointerEvent<HTMLCanvasElement>) {
    event.preventDefault();
    onPointerDown(event);
  }

  return (
    <div className="flex flex-1 flex-col">
      {solved ? null : (
        <p className="mb-3 text-[14px] leading-6 text-foreground break-keep">{ENTER}</p>
      )}
      <div
        className="play-canvas"
        onContextMenu={blockSelect}
        onDragStart={blockSelect}
        onCopy={blockSelect}
        onCut={blockSelect}
      >
        <canvas
          ref={bindCanvas}
          draggable={false}
          onPointerDown={down}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerLeave={onPointerLeave}
          onContextMenu={blockSelect}
          onDragStart={blockSelect}
          onCopy={blockSelect}
          onCut={blockSelect}
          onSelect={blockSelect}
          className={cn(
            "h-[min(58vh,560px)] w-full touch-none select-none bg-[#F4F4F2]",
            "rounded-sm border border-border/80",
            cursor === "grab" && "cursor-grab",
            cursor === "grabbing" && "cursor-grabbing",
          )}
          aria-label={ENTER}
        />
      </div>
    </div>
  );
}
