import { Component } from "vue";
import { IAnFormItem, IAnFormItemBase } from "../components/FormItem";

interface Setter<T extends Component, P = T extends new (...args: any) => any ? InstanceType<T>["$props"] : any> {
  /**
   * 输入组件
   */
  component: T;

  /**
   * 输入组件参数
   */
  componentProps?: P;

  /**
   * 初始化钩子
   * @param model 表单数据
   * @param item 表单项
   * @param items 表单项列表
   * @returns
   */
  onSetup?: (model: Recordable, item: IAnFormItemBase, items: IAnFormItemBase[]) => void;
}

export function defineSetter<T extends Component>(options: Setter<T>): Setter<T> {
  return options;
}
