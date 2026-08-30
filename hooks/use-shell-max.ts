"use client";

import { usePathname } from "next/navigation";

export function useShellMax() {
  const pathname = usePathname();
  const match = pathname.match(/^\/days\/(\d+)$/);
  const currentLevel = match ? Number(match[1]) : null;
  return {
    currentLevel,
    maxWidth: currentLevel ? "max-w-6xl" : "max-w-5xl",
  };
}
