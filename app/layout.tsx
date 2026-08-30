import type { Metadata } from "next";
import { Geist_Mono, Noto_Sans_SC } from "next/font/google";

import "./globals.css";

const notoSans = Noto_Sans_SC({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "图形学 · 每天一关",
  description: "用手把图形学拖明白。现在可以玩第 1 关和第 2 关。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      className={`${notoSans.variable} ${geistMono.variable} light h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
