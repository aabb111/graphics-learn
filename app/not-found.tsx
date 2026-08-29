import Link from "next/link";

import { SiteFooter } from "@/components/features/site/SiteFooter";
import { SiteHeader } from "@/components/features/site/SiteHeader";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-5 py-16">
        <p className="text-[12px] tracking-[0.18em] text-muted-foreground">没有这一页</p>
        <h1 className="mt-3 text-[32px] font-normal tracking-tight">走错关了</h1>
        <p className="mt-4 text-[15px] leading-7 text-muted-foreground">
          现在能玩的只有第 1 关。
        </p>
        <Link
          href="/days/1"
          className={cn(buttonVariants({ size: "lg" }), "mt-8 w-fit rounded-full px-5")}
        >
          去第 1 关
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
