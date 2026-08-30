export function WinFeedback() {
  return (
    <section className="flex flex-col gap-3">
      <p className="text-[14px] leading-6 text-success">
        三个顶点色对了，整面渐变就会对上；对上并稳住，才算过关。
      </p>
      <p className="text-[14px] leading-6">
        颜色是重心坐标混出来的。下一关看这张连续的面怎么变成一块块像素。
      </p>
      <div className="flex flex-col gap-3">
        <p className="text-[11px] tracking-[0.16em] text-muted-foreground">
          这是在学什么
        </p>
        <p className="text-[14px] leading-6 text-muted-foreground">
          三角里一点的颜色，是三个顶点色按重心坐标加权平均。
        </p>
      </div>
    </section>
  );
}
