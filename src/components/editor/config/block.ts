export interface Block<T = any> {
  /**
   * 组件ID
   */
  id: string;
  /**
   * 组件类型
   */
  type: string;
  /**
   * 组件名称
   */
  title: string;
  /**
   * 距离左侧
   */
  x: number;
  /**
   * 距离顶部
   */
  y: number;
  /**
   * 宽度
   */
  w: number;
  /**
   * 高度
   */
  h: number;
  /**
   * 水平方向是否固定
   */
  xFixed: boolean;
  /**
   * 垂直方向是否固定
   */
  yFixed: boolean;
  /**
   * 背景图片
   */
  bgImage?: string;
  /**
   * 背景颜色
   */
  bgColor?: string;
  /**
   * 是否选中
   */
  actived: boolean;
  /**
   * 是否可缩放
   */
  resizable: boolean;
  /**
   * 是否可拖拽
   */
  draggable: boolean;
  /**
   * 元数据
   */
  meta: Record<string, any>;
  /**
   * 组件参数
   */
  params: T;
}
