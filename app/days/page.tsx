import { DayList } from "@/components/features/catalog/DayList";
import { SiteFooter } from "@/components/features/site/SiteFooter";
import { SiteHeader } from "@/components/features/site/SiteHeader";

export default function DaysPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-10 md:px-8 md:py-16">
        <p className="text-[11px] tracking-[0.16em] text-muted-foreground">关卡列表</p>
        <h1 className="mt-3 text-[28px] font-normal tracking-tight">第 N 天</h1>
        <p className="mt-3 max-w-md text-[14px] leading-6 text-muted-foreground">
          每天一关。现在能玩的只有第 1 天，其余位置留着往后加。
        </p>
        <div className="mt-10">
          <DayList />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
