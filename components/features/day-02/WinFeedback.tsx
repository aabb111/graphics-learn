import { WinLine } from "@/components/features/motion/WinLine";

export function WinFeedback() {
  return (
    <section className="flex flex-col gap-3">
      <WinLine>对上了</WinLine>
      <p className="text-[14px] leading-6">
        颜色是重心坐标混出来的。下一关看这张连续的面怎么变成一块块像素。
      </p>
    </section>
  );
}
