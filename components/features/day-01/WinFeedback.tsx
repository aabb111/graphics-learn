import { LessonStrip } from "@/components/features/day-01/LessonStrip";

export function WinFeedback() {
  return (
    <section className="flex flex-col gap-3">
      <p className="text-[14px] leading-6 text-success">
        到了。三个角在这里各出三分之一。
      </p>
      <p className="text-[14px] leading-6">
        钉住后拖一个角，αβγ 几乎不变。这就是插值。
      </p>
      <div className="flex flex-col gap-3">
        <p className="text-[11px] tracking-[0.16em] text-muted-foreground">
          这是在学什么
        </p>
        <LessonStrip />
      </div>
    </section>
  );
}
