import { Component } from 'vue';
import { Block } from './block';
import { Container } from './container';

/**
 * 组件配置
 */
export interface Blocker<T = any> {
  /**
   * 组件名称
   */
  title: string;
  /**
   * 组件描述
   */
  description: string;
  /**
   * 组件类型
   */
  type: string;
  /**
   * 组件图标
   */
  icon: string;
  /**
   * 组件默认值
   */
  initial: T;
  /**
   * 编辑时的渲染组件
   */
  render: Component;
  /**
   * 配置时的渲染组件
   */
  option: Component;
  /**
   * 预览时的渲染组件
   */
  viewer?: Component;
  /**
   * 将实际格式转换为内部格式
   */
  onLoadContainer?: (container: Container) => void;
  /**
   * 将内部格式转换为实际格式
   */
  onSaveContainer?: (container: Container) => any;
  /**
   * 将实际格式转换为内部格式
   */
  onLoadBlock?: (data: any) => Block;
  /**
   * 将内部格式转换为实际格式
   */
  onSaveBlock?: (block: Block) => any;
  /**
   * 在左侧添加选项卡
   */
  addLeftTab?: () => {
    title: string;
    icon: string | Component;
    component: Component;
  };
  addBlock?: () => {
    /**
     * 唯一标识符
     */
    name: string;
    /**
     * 显示标题
     */
    title: string;
    /**
     * 显示图标
     */
    icon: string;
    /**
     * 显示描述
     */
    description: string;
    /**
     * 默认初始值
     */
    initial: Block;
    /**
     * 预览时的渲染组件
     */
    render: Component;
    /**
     * 编辑参数时的渲染组件
     */
    optionRender: Component<{ modelValue: Block }>;
    /**
     * 编辑时的渲染组件
     */
    modifyRender: Component;
  }
}

/**
 * 定义组件
 * @param blocker 参数
 * @returns
 */
export const defineBlocker = <T>(blocker: Blocker<T>) => {
  return blocker;
};
