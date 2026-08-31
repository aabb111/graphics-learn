import Link from "next/link";

import { LessonBlock } from "@/components/features/lesson/LessonBlock";
import { HoldHint } from "@/components/features/motion/HoldHint";
import { MatchMeter } from "@/components/features/day-02/MatchMeter";
import { WinFeedback } from "@/components/features/day-02/WinFeedback";
import { Button, buttonVariants } from "@/components/ui/button";
import type { ColorHud } from "@/lib/day-02/studio";
import { L2_LINKS } from "@/lib/days/sources";
import { cn } from "@/lib/utils";

type ColorPanelProps = {
  hud: ColorHud;
  onReset: () => void;
};

export function ColorPanel({ hud, onReset }: ColorPanelProps) {
  return (
    <aside className="flex flex-col gap-8 md:w-[340px] md:shrink-0">
      <div className="flex flex-col gap-3">
        <p className="text-[11px] tracking-[0.16em] text-muted-foreground">第 2 关</p>
        <h1 className="text-[28px] font-normal tracking-tight">顶点颜色插值</h1>
      </div>
      <MatchMeter hud={hud} />
      {hud.solved ? (
        <div className="flex flex-col gap-3">
          <WinFeedback />
          <div className="flex flex-nowrap items-center gap-2">
            <Button variant="ghost" className="h-8" onClick={onReset}>
              再玩一次
            </Button>
            <Link href="/" className={cn(buttonVariants({ variant: "default" }), "h-8")}>
              回首页
            </Link>
          </div>
        </div>
      ) : (
        <HoldHint show={hud.holding} />
      )}
      <LessonBlock
        ink="三个角各自带颜色，中间每一点用那三个数兑出来。整面渐变不用存每一个点的色。"
        mute="这叫顶点颜色插值。"
        links={L2_LINKS}
      />
      {hud.solved ? null : (
        <Button variant="ghost" className="h-8 w-fit" onClick={onReset}>
          重置三角形
        </Button>
      )}
    </aside>
  );
}
