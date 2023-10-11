import { Font } from "../font";

export interface TextData {
  /**
   * 是否滚动
   */
  marquee?: boolean;
  /**
   * 滚动速度
   */
  marqueeSpeed?: number;
  /**
   * 滚动方向
   */
  marqueeDirection?: "left" | "right" | "up" | "down";
  /**
   * 内容(中文)
   */
  fontCh: Font;
}

export const DirectionOptions = [
  {
    icon: "icon-park-outline-arrow-left",
    tip: "向左滚动",
    value: "left",
  },
  {
    icon: "icon-park-outline-arrow-up",
    tip: "向上滚动",
    value: "up",
  },
  {
    icon: "icon-park-outline-arrow-down",
    tip: "向下滚动",
    value: "down",
  },
  {
    icon: "icon-park-outline-arrow-right",
    tip: "向右滚动",
    value: "right",
  },
];
