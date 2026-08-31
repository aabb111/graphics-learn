import { notFound } from "next/navigation";

import { UpcomingDay } from "@/components/features/catalog/UpcomingDay";
import { Day01Studio } from "@/components/features/day-01/Day01Studio";
import { Day02Studio } from "@/components/features/day-02/Day02Studio";
import { Day03Studio } from "@/components/features/day-03/Day03Studio";
import { SiteFooter } from "@/components/features/site/SiteFooter";
import { SiteHeader } from "@/components/features/site/SiteHeader";
import { DAYS, getDay } from "@/lib/days/catalog";

export function generateStaticParams() {
  return DAYS.map((entry) => ({ day: String(entry.day) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const { day } = await params;
  const entry = getDay(Number(day));
  if (!entry) return { title: "没有这一关" };
  return { title: `第 ${entry.day} 关 · ${entry.title}` };
}

export default async function DayPage({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const { day } = await params;
  const entry = getDay(Number(day));
  if (!entry) notFound();

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-6 md:px-8 md:py-8">
        {entry.day === 1 && entry.status === "playable" ? (
          <Day01Studio />
        ) : entry.day === 2 && entry.status === "playable" ? (
          <Day02Studio />
        ) : entry.day === 3 && entry.status === "playable" ? (
          <Day03Studio />
        ) : (
          <UpcomingDay entry={entry} />
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
