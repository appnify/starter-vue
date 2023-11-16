import { Component } from 'vue';
import { IAnFormItemBase, IAnFormItemSlot } from '../components/FormItem';

export interface ItemSetter<P extends object, S extends string> {
  /**
   * 输入组件
   */
  setter: Component;

  /**
   * 输入组件参数
   */
  setterProps?: P;

  /**
   * 空间插槽
   */
  setterSlots?: {
    /**
     * 控件插槽
     * @example
     * ```tsx
     * (props) => {
     *   return <span>{props.item.label}</span>
     * }
     * ```
     */
    [key in S]?: IAnFormItemSlot;
  };

  /**
   * 初始化钩子
   */
  onSetup?: (args: { model: Recordable; item: IAnFormItemBase; items: IAnFormItemBase[] }) => void;
}

export function defineSetter<P extends object, S extends string>(setter: ItemSetter<P, S>) {
  return setter;
}
