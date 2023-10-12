import { Block } from "../../config";
import { Font } from "../components/font";

export interface DatePrams {
  /**
   * 日期格式
   */
  format: 'YYYY-MM-DD' | 'YYYY年MM月DD日';
  fontCh: Font;
}

/**
 * 日期组件
 */
export type Date = Block<DatePrams>;

/**
 * 日期格式建议
 */
export const FomatSuguestions = ['YYYY-MM-DD', 'YYYY年MM月DD日'];