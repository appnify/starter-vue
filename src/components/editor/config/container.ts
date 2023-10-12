export interface Container {
  /**
   * 容器id
   */
  id: number | string;
  /**
   * X轴偏移量
   */
  x: number;
  /**
   * Y轴偏移量
   */
  y: number;
  /**
   * 缩放比例
   */
  zoom: number;
  /**
   * 标题
   */
  title: string;
  /**
   * 描述
   */
  description: string;
  /**
   * 宽度
   */
  width: number;
  /**
   * 高度
   */
  height: number;
  /**
   * 背景图片
   */
  bgImage: string;
  /**
   * 背景颜色
   */
  bgColor: string;
}
