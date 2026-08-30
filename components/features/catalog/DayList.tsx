import { DayCard } from "@/components/features/catalog/DayCard";
import { DAYS } from "@/lib/days/catalog";

export function DayList() {
  return (
    <section aria-label="关卡列表">
      {DAYS.filter((entry) => entry.status === "playable").map((entry) => (
        <DayCard key={entry.day} entry={entry} />
      ))}
      <p className="border-b border-border/80 py-6 text-[14px] leading-6 text-muted-foreground">
        后面的关还在路上
      </p>
    </section>
  );
}
