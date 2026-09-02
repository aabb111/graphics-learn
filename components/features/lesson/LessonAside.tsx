import type { ReactNode } from "react";

import { FeedbackSlot } from "@/components/features/motion/FeedbackSlot";

type LessonAsideProps = {
  kicker: string;
  title: string;
  hud?: ReactNode;
  feedback: ReactNode;
  showFeedback: boolean;
  children: ReactNode;
};

export function LessonAside({
  kicker,
  title,
  hud,
  feedback,
  showFeedback,
  children,
}: LessonAsideProps) {
  return (
    <aside className="flex flex-col md:w-[340px] md:shrink-0 lg:sticky lg:top-6 lg:max-h-[calc(100dvh-6rem)]">
      <div className="flex shrink-0 flex-col gap-8">
        <div className="flex flex-col gap-3">
          <p className="text-[11px] tracking-[0.16em] text-muted-foreground">{kicker}</p>
          <h1 className="text-[28px] font-normal tracking-tight">{title}</h1>
        </div>
        {hud}
      </div>
      <FeedbackSlot show={showFeedback}>{feedback}</FeedbackSlot>
      <div className="mt-8 flex min-h-0 flex-col gap-8 lg:flex-1 lg:overflow-y-auto">
        {children}
      </div>
    </aside>
  );
}
