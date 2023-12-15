/**
 * 画布配置
 */
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
  langList: string[];
  langSwitch: number;
}

/**
 * 画布默认配置
 */
export const defaultContainer: Container = {
  id: 11,
  title: "国庆节喜庆版式设计",
  description: "适用于国庆节1日-7日间上午9:00-10:00播出的版式设计",
  x: 0,
  y: 0,
  zoom: 0.7,
  width: 1920,
  height: 1080,
  bgImage: "",
  bgColor: "#ffffff",
  langList: ['ch', 'en'],
  langSwitch: 0
};
