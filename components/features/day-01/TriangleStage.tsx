"use client";

import type { PointerEvent, SyntheticEvent } from "react";

import { cn } from "@/lib/utils";
import type { Studio, StudioCursor } from "@/lib/geometry/studio";

type TriangleStageProps = {
  studio: Studio;
  solved: boolean;
  cursor: StudioCursor;
};

function blockSelect(event: SyntheticEvent) {
  event.preventDefault();
}

export function TriangleStage({ studio, solved, cursor }: TriangleStageProps) {
  const {
    bindCanvas,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onPointerLeave,
  } = studio;

  function down(event: PointerEvent<HTMLCanvasElement>) {
    event.preventDefault();
    onPointerDown(event);
  }

  return (
    <div className="flex flex-1 flex-col">
      {solved ? null : (
        <p className="mb-3 text-[14px] leading-6 text-foreground break-keep">
          拖中间这个点。三个数会变。拖到正中，三个数一样。
        </p>
      )}
      <div
        className="day1-play"
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
          onPointerCancel={onPointerCancel}
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
          aria-label="拖中间这个点。三个数会变。拖到正中，三个数一样。"
        />
      </div>
    </div>
  );
}
