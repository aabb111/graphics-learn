import { TARGET_CSS } from "@/lib/day-02/world";
import { VERTEX_HEX } from "@/lib/geometry/colors";

export type DayStatus = "playable" | "upcoming";

export type DayEntry = {
  day: number;
  title: string;
  lede: string;
  status: DayStatus;
  accents: [string, string, string];
};

export const DAYS: DayEntry[] = [
  {
    day: 1,
    title: "三个角各占多少",
    lede: "三个数决定三角形里每一点的颜色。",
    status: "playable",
    accents: [VERTEX_HEX.a, VERTEX_HEX.b, VERTEX_HEX.c],
  },
  {
    day: 2,
    title: "顶点颜色插值",
    lede: "三个角各自带一种颜色，三角里每一点都是它们兑出来的。",
    status: "playable",
    accents: [TARGET_CSS.a, TARGET_CSS.b, TARGET_CSS.c],
  },
  {
    day: 3,
    title: "光栅化成像素",
    lede: "斜边变成一块一块的像素。",
    status: "playable",
    accents: [VERTEX_HEX.a, VERTEX_HEX.b, VERTEX_HEX.c],
  },
  {
    day: 4,
    title: "深度缓冲",
    lede: "近的盖住远的。",
    status: "playable",
    accents: [VERTEX_HEX.a, VERTEX_HEX.c, VERTEX_HEX.a],
  },
  {
    day: 5,
    title: "2D 变换",
    lede: "挪、转、放大缩小，对上那块淡影。",
    status: "playable",
    accents: [VERTEX_HEX.a, "#141414", VERTEX_HEX.a],
  },
];

export function getDay(day: number) {
  return DAYS.find((entry) => entry.day === day) ?? null;
}
