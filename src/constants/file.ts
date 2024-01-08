import { defineConstants } from './defineConstants';

/**
 * 文件类型
 */
export enum FileType {
  /**
   * 视频
   */
  VIDEO = 1,
  /**
   * 音频
   */
  AUDIO = 2,
  /**
   * 图片
   */
  IMAGE = 3,
  /**
   * 文本
   */
  TEXT = 4,
  /**
   * 其他
   */
  OTHER = 5,
}

export const FileTypes = defineConstants([
  {
    label: '视频',
    value: FileType.VIDEO,
  },
  {
    label: '音频',
    value: FileType.AUDIO,
  },
  {
    label: '图片',
    value: FileType.IMAGE,
  },
  {
    label: '文本',
    value: FileType.TEXT,
  },
  {
    label: '其他',
    value: FileType.OTHER,
  },
]);
