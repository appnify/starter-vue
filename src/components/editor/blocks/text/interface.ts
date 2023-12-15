import { Block } from "../../core";
import { Font } from "../font";

export interface OutputText {
  id: string;
}

export interface TextPrams {
  /**
   * 是否滚动
   */
  marquee?: boolean;
  /**
   * 滚动速度
   */
  speed?: number;
  /**
   * 滚动方向
   */
  direction?: "left" | "right" | "up" | "down";
  /**
   * 内容(中文)
   */
  fontCh: Font;
}

/**
 * 文本组件
 */
export type Text = Block<TextPrams>;

/**
 * 滚动方向选项
 */
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
