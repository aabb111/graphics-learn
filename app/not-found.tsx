import Link from "next/link";

import { SiteFooter } from "@/components/features/site/SiteFooter";
import { SiteHeader } from "@/components/features/site/SiteHeader";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-5 py-16 md:px-8">
        <p className="text-[11px] tracking-[0.16em] text-muted-foreground">没有这一页</p>
        <h1 className="mt-3 text-[28px] font-normal tracking-tight">走错关了</h1>
        <p className="mt-4 text-[14px] leading-6 text-muted-foreground">
          现在能玩的是第 1 关和第 2 关。
        </p>
        <Link
          href="/"
          className={cn(buttonVariants({ size: "lg" }), "mt-8 w-fit rounded-full px-5")}
        >
          回首页
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
