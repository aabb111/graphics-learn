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
];

export function getDay(day: number) {
  return DAYS.find((entry) => entry.day === day) ?? null;
}
