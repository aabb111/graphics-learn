import Link from "next/link";

import { LessonNote } from "@/components/features/lesson/LessonNote";
import { MatchMeter } from "@/components/features/day-02/MatchMeter";
import { WinFeedback } from "@/components/features/day-02/WinFeedback";
import { Button, buttonVariants } from "@/components/ui/button";
import type { ColorHud } from "@/lib/day-02/studio";
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
      {hud.solved ? (
        <WinFeedback />
      ) : (
        <div className="flex flex-col gap-3">
          <LessonNote
            ink="三个角各自带一种颜色，三角里每一点都是它们兑出来的。"
            mute="顶点只存三个色，中间那些点不用再存。"
          />
          <MatchMeter hud={hud} />
        </div>
      )}
      <div className="flex flex-nowrap items-center gap-2">
        {hud.solved ? (
          <>
            <Button variant="ghost" className="h-8" onClick={onReset}>
              再玩一次
            </Button>
            <Link
              href="/"
              className={cn(buttonVariants({ variant: "default" }), "h-8")}
            >
              回首页
            </Link>
          </>
        ) : (
          <Button variant="ghost" className="h-8" onClick={onReset}>
            重置三角形
          </Button>
        )}
      </div>
    </aside>
  );
}
