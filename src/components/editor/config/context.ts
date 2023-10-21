import { InjectionKey, Ref } from "vue";
import { Block } from "./block";
import { Container } from "./container";
import { ReferenceLine } from "./ref-line";

export interface Current {
  block: Block | null;
  rightPanelCollapsed: boolean;
}

export interface Context {
  /**
   * 运行时数据
   */
  current: Ref<Current>;
  /**
   * 组件列表
   */
  blocks: Ref<Block[]>;
  /**
   * 画布配置
   */
  container: Ref<Container>;
  /**
   * 参考线
   */
  refLine: ReferenceLine;
  /**
   * 设置当前组件
   * @param block 组件
   * @returns
   */
  setCurrentBlock: (block: Block | null) => void;
  /**
   * 容器自适应
   */
  setContainerOrigin: () => void;
  /**
   * 保存数据
   */
  saveData: () => void;
  /**
   * 加载数据
   */
  loadData: () => void;
  /**
   * 预览
   */
  preview: () => void;
}

export const ContextKey = Symbol("ContextKey") as InjectionKey<Context>;
