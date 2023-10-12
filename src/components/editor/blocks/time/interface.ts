import { Block } from "../../config";
import { Font } from "../components/font";

export interface TimeParams {
  /**
   * 日期格式
   */
  fontCh: Font;
}

/**
 * 时间组件
 */
export type Time = Block<TimeParams>;

/**
 * 时间格式建议
 */
export const FomatSuguestions = ["HH:mm:ss", "HH:mm", "HH时mm分ss秒", "HH时mm分"];
