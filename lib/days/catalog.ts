export type DayStatus = "playable" | "upcoming";

export type DayEntry = {
  day: number;
  title: string;
  lede: string;
  status: DayStatus;
};

export const DAYS: DayEntry[] = [
  {
    day: 1,
    title: "重心坐标把三角形涂满",
    lede: "三个数决定三角形里每一点的颜色。",
    status: "playable",
  },
  {
    day: 2,
    title: "半空间：一条边的内侧",
    lede: "下一关会接着讲边与内外。",
    status: "upcoming",
  },
  {
    day: 3,
    title: "深度：谁挡住了谁",
    lede: "关卡会一张一张加。",
    status: "upcoming",
  },
];

export function getDay(day: number) {
  return DAYS.find((entry) => entry.day === day) ?? null;
}

