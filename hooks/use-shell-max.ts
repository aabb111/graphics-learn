"use client";

import { usePathname } from "next/navigation";

export function useShellMax() {
  const pathname = usePathname();
  const isStudio = /^\/days\/\d+$/.test(pathname);
  return {
    isDay1: pathname === "/days/1",
    maxWidth: isStudio ? "max-w-6xl" : "max-w-5xl",
  };
}
