import { Font } from "../font";

export interface DateData {
  /**
   * 日期格式
   */
  format: 'YYYY-MM-DD' | 'YYYY年MM月DD日';
  fontCh: Font;
}