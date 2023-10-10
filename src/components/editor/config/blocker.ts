import { Component } from "vue";
import { Block } from "./block";

interface Blocker {
  /**
   * 组件默认值
   */
  initial: Block;
  /**
   * 渲染组件
   */
  render: Component;
  /**
   * 配置组件
   */
  option: Component;
}

/**
 * 定义组件
 * @param blocker 参数
 * @returns
 */
export const defineBlocker = (blocker: Blocker) => {
  return blocker;
};
