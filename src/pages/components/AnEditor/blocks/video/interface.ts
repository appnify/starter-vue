import { Block } from "../../core";

export interface VideoPrams {
  type: 'live' | 'file',
  url: string;
  /**
   * 视频地址
   */
  videos: any[];
  /**
   * 播放比例
   */
  fit: 'cover' | 'contain';
}

/**
 * 文本组件
 */
export type Video = Block<VideoPrams>;