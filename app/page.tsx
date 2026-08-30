import { DayList } from "@/components/features/catalog/DayList";
import { HomeHero } from "@/components/features/catalog/HomeHero";
import { SiteFooter } from "@/components/features/site/SiteFooter";
import { SiteHeader } from "@/components/features/site/SiteHeader";

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-5 py-10 md:px-8 md:py-16">
        <HomeHero />
        <DayList />
      </main>
      <SiteFooter />
    </div>
  );
}
