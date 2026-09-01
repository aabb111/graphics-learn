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
      <PassStamp mark="5" />
      <p className="motion-pass-late text-[14px] leading-6">
        对上了。位置、角度、大小可以分开改。
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
