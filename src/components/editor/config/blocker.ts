import { Component } from "vue";
import { Block } from "./block";

interface Blocker<T = any> {
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
  initial: Block<T>;
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
   * 初始化钩子
   * @param block 组件
   * @returns
   */
  onInit?: (block: Block) => void;
}

/**
 * 定义组件
 * @param blocker 参数
 * @returns
 */
export const defineBlocker = <T>(blocker: Blocker<T>) => {
  return blocker;
};
