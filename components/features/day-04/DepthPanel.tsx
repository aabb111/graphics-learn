import { LessonAside } from "@/components/features/lesson/LessonAside";
import { LessonBlock } from "@/components/features/lesson/LessonBlock";
import { HoldHint } from "@/components/features/motion/HoldHint";
import { WinFeedback } from "@/components/features/day-04/WinFeedback";
import { Button } from "@/components/ui/button";
import type { DepthHud } from "@/lib/day-04/studio";
import { L4_LINKS } from "@/lib/days/sources";
import { L4_KNOWLEDGE } from "@/lib/days/knowledge";

type DepthPanelProps = {
  hud: DepthHud;
  onReset: () => void;
};

export function DepthPanel({ hud, onReset }: DepthPanelProps) {
  return (
    <LessonAside
      kicker="第 4 关"
      title="深度缓冲"
      showFeedback={hud.solved || hud.holding}
      feedback={hud.solved ? <WinFeedback onReset={onReset} /> : <HoldHint />}
    >
      <LessonBlock ink={L4_KNOWLEDGE} mute="这叫深度缓冲。" links={L4_LINKS} />
      {hud.solved ? null : (
        <Button variant="ghost" className="h-8 w-fit" onClick={onReset}>
          重置远近
        </Button>
      )}
    </LessonAside>
  );
}
