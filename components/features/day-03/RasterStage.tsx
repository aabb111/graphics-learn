"use client";

import type { PointerEvent, SyntheticEvent } from "react";

import { cn } from "@/lib/utils";
import type { RasterStudio } from "@/lib/day-03/studio";

type RasterStageProps = {
  studio: RasterStudio;
  solved: boolean;
};

function blockSelect(event: SyntheticEvent) {
  event.preventDefault();
}

export function RasterStage({ studio, solved }: RasterStageProps) {
  const { bindCanvas, onPointerDown } = studio;

  function down(event: PointerEvent<HTMLCanvasElement>) {
    event.preventDefault();
    onPointerDown(event);
  }

  return (
    <div className="flex flex-1 flex-col">
      {solved ? null : (
        <p className="mb-3 text-[14px] leading-6 text-foreground break-keep">
          点格子。中心落在三角里的，才该亮。
        </p>
      )}
      <div
        className="play-canvas"
        onContextMenu={blockSelect}
        onDragStart={blockSelect}
      >
        <canvas
          ref={bindCanvas}
          draggable={false}
          onPointerDown={down}
          onContextMenu={blockSelect}
          onDragStart={blockSelect}
          className={cn(
            "h-[min(58vh,560px)] w-full cursor-pointer touch-none select-none bg-[#F4F4F2]",
            "rounded-sm border border-border/80",
          )}
          aria-label="点格子。中心落在三角里的，才该亮。"
        />
      </div>
    </div>
  );
}
