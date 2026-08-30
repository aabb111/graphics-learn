export function LessonStrip() {
  return (
    <p className="max-w-xl text-[14px] leading-6 text-muted-foreground">
      三角形里的每一点，都是三个顶点按 α、β、γ 加权平均。光栅化涂像素、贴纹理、在顶点之间插值，靠的都是这份重心坐标。
    </p>
  );
}
