import { LessonNote } from "@/components/features/lesson/LessonNote";
import { HoldHint } from "@/components/features/motion/HoldHint";
import { WinFeedback } from "@/components/features/day-04/WinFeedback";
import { Button } from "@/components/ui/button";
import type { DepthHud } from "@/lib/day-04/studio";

type DepthPanelProps = {
  hud: DepthHud;
  onReset: () => void;
};

export function DepthPanel({ hud, onReset }: DepthPanelProps) {
  return (
    <aside className="flex flex-col gap-8 md:w-[340px] md:shrink-0">
      <div className="flex flex-col gap-3">
        <p className="text-[11px] tracking-[0.16em] text-muted-foreground">第 4 关</p>
        <h1 className="text-[28px] font-normal tracking-tight">深度缓冲</h1>
      </div>
      {hud.solved ? (
        <WinFeedback onReset={onReset} />
      ) : (
        <div className="flex flex-col gap-3">
          <LessonNote
            ink="重叠的格子只留一个颜色，近的赢。"
            mute="这叫深度缓冲。"
          />
          <HoldHint show={hud.holding} />
          <Button variant="ghost" className="h-8 w-fit" onClick={onReset}>
            重置远近
          </Button>
        </div>
      )}
    </aside>
  );
}
