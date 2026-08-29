import { DayCard } from "@/components/features/catalog/DayCard";
import { DAYS } from "@/lib/days/catalog";

export function DayList() {
  return (
    <section aria-label="关卡列表">
      {DAYS.map((entry) => (
        <DayCard key={entry.day} entry={entry} />
      ))}
    </section>
  );
}
