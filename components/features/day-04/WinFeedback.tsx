import Link from "next/link";

import { PassStamp } from "@/components/features/day-01/PassStamp";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type WinFeedbackProps = {
  onReset: () => void;
};

export function WinFeedback({ onReset }: WinFeedbackProps) {
  return (
    <section className="flex flex-col gap-3">
      <p className="motion-pass-title text-[14px] leading-6 text-success">过关了</p>
      <PassStamp mark="4" />
      <p className="motion-pass-late text-[14px] leading-6">
        挡住的那块没消失，是比下去了。
      </p>
      <div className="motion-pass-late flex flex-nowrap items-center gap-2">
        <Button variant="ghost" className="h-8" onClick={onReset}>
          再玩一次
        </Button>
        <Link href="/" className={cn(buttonVariants({ variant: "default" }), "h-8")}>
          回首页
        </Link>
      </div>
    </section>
  );
}
