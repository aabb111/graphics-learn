import { LessonAside } from "@/components/features/lesson/LessonAside";
import { LessonBlock } from "@/components/features/lesson/LessonBlock";
import { HoldHint } from "@/components/features/motion/HoldHint";
import { WinFeedback } from "@/components/features/day-05/WinFeedback";
import { Button } from "@/components/ui/button";
import type { TransformHud } from "@/lib/day-05/studio";
import { L5_LINKS } from "@/lib/days/sources";
import { L5_KNOWLEDGE } from "@/lib/days/knowledge";

type TransformPanelProps = {
  hud: TransformHud;
  onReset: () => void;
};

export function TransformPanel({ hud, onReset }: TransformPanelProps) {
  return (
    <LessonAside
      kicker="第 5 关"
      title="变换"
      showFeedback={hud.solved || hud.holding}
      feedback={hud.solved ? <WinFeedback onReset={onReset} /> : <HoldHint />}
    >
      <LessonBlock ink={L5_KNOWLEDGE} mute="这叫变换。" links={L5_LINKS} />
      {hud.solved ? null : (
        <Button variant="ghost" className="h-8 w-fit" onClick={onReset}>
          重置变换
        </Button>
      )}
    </LessonAside>
  );
}
