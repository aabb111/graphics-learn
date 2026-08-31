import { LessonNote } from "@/components/features/lesson/LessonNote";
import { HoldHint } from "@/components/features/motion/HoldHint";
import { WeightBars } from "@/components/features/day-01/WeightBars";
import { WinFeedback } from "@/components/features/day-01/WinFeedback";
import { Button } from "@/components/ui/button";
import type { StudioHud } from "@/lib/geometry/studio";

type CoordPanelProps = {
  hud: StudioHud;
  onReset: () => void;
};

export function CoordPanel({ hud, onReset }: CoordPanelProps) {
  return (
    <aside className="flex flex-col gap-8 md:w-[340px] md:shrink-0">
      <div className="flex flex-col gap-3">
        <p className="text-[11px] tracking-[0.16em] text-muted-foreground">第 1 关</p>
        <h1 className="text-[28px] font-normal tracking-tight">
          三个角各占多少
        </h1>
      </div>
      <WeightBars hud={hud} />
      {hud.solved ? (
        <WinFeedback onReset={onReset} />
      ) : (
        <div className="flex flex-col gap-3">
          <LessonNote
            ink="这三个数，是这一点里三个角各占多少。靠近就接近 1，正中都是三分之一。"
            mute="这叫重心坐标。上色、贴图都先算它。"
          />
          <HoldHint show={hud.holding} />
          <Button variant="ghost" className="h-8 w-fit" onClick={onReset}>
            重置三角形
          </Button>
        </div>
      )}
    </aside>
  );
}
