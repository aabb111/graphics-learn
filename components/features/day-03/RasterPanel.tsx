import { LessonAside } from "@/components/features/lesson/LessonAside";
import { LessonBlock } from "@/components/features/lesson/LessonBlock";
import { HoldHint } from "@/components/features/motion/HoldHint";
import { WinFeedback } from "@/components/features/day-03/WinFeedback";
import { Button } from "@/components/ui/button";
import type { RasterHud } from "@/lib/day-03/studio";
import { L3_LINKS } from "@/lib/days/sources";
import { L3_KNOWLEDGE } from "@/lib/days/knowledge";

type RasterPanelProps = {
  hud: RasterHud;
  onReset: () => void;
};

export function RasterPanel({ hud, onReset }: RasterPanelProps) {
  return (
    <LessonAside
      kicker="第 3 关"
      title="光栅化成像素"
      showFeedback={hud.solved || hud.holding}
      feedback={hud.solved ? <WinFeedback onReset={onReset} /> : <HoldHint />}
    >
      <LessonBlock ink={L3_KNOWLEDGE} mute="这叫光栅化。" links={L3_LINKS} />
      {hud.solved ? null : (
        <Button variant="ghost" className="h-8 w-fit" onClick={onReset}>
          重置格子
        </Button>
      )}
    </LessonAside>
  );
}
