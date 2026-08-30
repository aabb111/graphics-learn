import { DayList } from "@/components/features/catalog/DayList";
import { SiteFooter } from "@/components/features/site/SiteFooter";
import { SiteHeader } from "@/components/features/site/SiteHeader";

export default function DaysPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-10 md:px-8 md:py-16">
        <p className="text-[11px] tracking-[0.16em] text-muted-foreground">关卡列表</p>
        <h1 className="mt-3 text-[28px] font-normal tracking-tight">关卡</h1>
        <div className="mt-10">
          <DayList />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
