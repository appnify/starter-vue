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
    [key in S]?: IAnFormItemSlot;
  };

  /**
   * 初始化钩子
   */
  onSetup?: (model: Recordable, item: IAnFormItemBase, items: IAnFormItemBase[]) => void;
}