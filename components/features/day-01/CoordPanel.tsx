import { LessonAside } from "@/components/features/lesson/LessonAside";
import { LessonBlock } from "@/components/features/lesson/LessonBlock";
import { HoldHint } from "@/components/features/motion/HoldHint";
import { WeightBars } from "@/components/features/day-01/WeightBars";
import { WinFeedback } from "@/components/features/day-01/WinFeedback";
import { Button } from "@/components/ui/button";
import { L1_LINKS } from "@/lib/days/sources";
import { L1_KNOWLEDGE } from "@/lib/days/knowledge";
import type { StudioHud } from "@/lib/geometry/studio";

type CoordPanelProps = {
  hud: StudioHud;
  onReset: () => void;
};

export function CoordPanel({ hud, onReset }: CoordPanelProps) {
  return (
    <LessonAside
      kicker="第 1 关"
      title="三个角各占多少"
      hud={<WeightBars hud={hud} />}
      showFeedback={hud.solved || hud.holding}
      feedback={hud.solved ? <WinFeedback onReset={onReset} /> : <HoldHint />}
    >
      <LessonBlock
        ink={L1_KNOWLEDGE}
        mute="这叫重心坐标。上色、贴图都先算它。"
        links={L1_LINKS}
      />
      {hud.solved ? null : (
        <Button variant="ghost" className="h-8 w-fit" onClick={onReset}>
          重置三角形
        </Button>
      )}
    </LessonAside>
  );
}
