import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type FeedbackSlotProps = {
  show: boolean;
  children: ReactNode;
};

export function FeedbackSlot({ show, children }: FeedbackSlotProps) {
  return (
    <div
      className={cn("feedback-slot grid", show ? "feedback-slot-in" : "feedback-slot-out")}
      aria-hidden={!show}
    >
      <div className="feedback-slot-body min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}
