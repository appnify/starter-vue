import { CSSProperties } from 'vue';
import { Block } from './block';

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
  /**
   * 使用的语言列表
   */
  langList: string[];
  /**
   * 语言的切换间隔
   */
  langSwitch: number;
  /**
   * 组件列表
   */
  children: Block[];
  /**
   * 当前选中的组件
   */
  current: Block | null;
}

/**
 * 画布默认配置
 */
export const defaultContainer: Container = {
  id: 11,
  title: '国庆节喜庆版式设计',
  description: '适用于国庆节1日-7日间上午9:00-10:00播出的版式设计',
  x: 0,
  y: 0,
  zoom: 0.7,
  width: 1920,
  height: 1080,
  bgImage: '',
  bgColor: '#ffffff',
  langList: ['ch', 'en'],
  langSwitch: 0,
  children: [],
  current: null,
};

export function formatContainerStyle(container: Container) {
  const { width, height, bgColor, bgImage, zoom, x, y } = container;
  return {
    position: 'absolute',
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: bgColor,
    backgroundImage: bgImage ? `url(${bgImage})` : null,
    backgroundSize: '100% 100%',
    transform: `translate3d(${x}px, ${y}px, 0) scale(${zoom})`,
  } as CSSProperties;
}
