"use client";

import type { PointerEvent, SyntheticEvent } from "react";

import { cn } from "@/lib/utils";
import type { DepthHud, DepthStudio } from "@/lib/day-04/studio";

type DepthStageProps = {
  studio: DepthStudio;
  solved: boolean;
  cursor: DepthHud["cursor"];
};

function blockSelect(event: SyntheticEvent) {
  event.preventDefault();
}

export function DepthStage({ studio, solved, cursor }: DepthStageProps) {
  const { bindPlay, bindTarget, onPointerDown, onPointerMove, onPointerUp } =
    studio;

  function down(event: PointerEvent<HTMLCanvasElement>) {
    event.preventDefault();
    onPointerDown(event);
  }

  return (
    <div className="flex min-w-0 flex-1 flex-col">
      {solved ? null : (
        <p className="mb-3 text-[14px] leading-6 text-foreground break-keep">
          拖每条边上的远近。近的盖住远的。
        </p>
      )}
      <div className="flex flex-col gap-6">
        <div
          className="play-canvas"
          onContextMenu={blockSelect}
          onDragStart={blockSelect}
        >
          <canvas
            ref={bindPlay}
            draggable={false}
            onPointerDown={down}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onContextMenu={blockSelect}
            onDragStart={blockSelect}
            className={cn(
              "h-[min(52vh,480px)] w-full touch-none select-none bg-[#F4F4F2]",
              "rounded-sm border border-border/80",
              cursor === "grab" && "cursor-grab",
              cursor === "grabbing" && "cursor-grabbing",
            )}
            aria-label="拖每条边上的远近。近的盖住远的。"
          />
        </div>
        <div className="mx-auto flex w-[40%] flex-col gap-2">
          <p className="text-[11px] tracking-[0.16em] text-muted-foreground">
            目标
          </p>
          <canvas
            ref={bindTarget}
            className="aspect-[4/3] w-full rounded-sm border border-border/80 bg-[#F4F4F2]"
            aria-label="目标"
          />
        </div>
      </div>
    </div>
  );
}
