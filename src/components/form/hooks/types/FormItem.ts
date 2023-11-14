import { FormItemInstance } from "@arco-design/web-vue";
import { NodeType, NodeUnion } from "../../nodes";
import { Rule } from "../useRules";
import { IAnFormItem, IAnFormItemBoolFn, IAnFormItemElemFn } from "../../components/FormItem";

/**
 * 函数参数
 */
export type FormItemFnArg<T = FormItem> = {
  item: T;
  items: T[];
  model: Recordable;
};

/**
 * 表单项数据
 */
type BaseFormItem = {
  /**
   * 字段名，特殊语法在提交时会自动转换。
   * @example
   * ```typescript
   * '[v1, v2]' => { v1, v2 }
   * ```
   */
  field: string;

  /**
   * 初始值
   * @description 若指定该参数，将覆盖model中的同名属性。
   */
  value?: any;

  /**
   * 渲染函数
   * @description 用于自定义表单项内容
   */
  render?: NodeType | IAnFormItemElemFn;

  /**
   * 标签名
   * @description 同FormItem组件的label属性
   */
  label?: string | IAnFormItemElemFn;

  /**
   * 帮助提示
   * @description 同FormItem组件的help插槽
   */
  help?: string | IAnFormItemElemFn;

  /**
   * 额外内容
   * @description 同FormItem组件的extra插槽
   */
  extra?: string | IAnFormItemElemFn;

  /**
   * 是否必填
   * @description 默认值为false
   */
  required?: boolean;

  /**
   * 校验规则
   * @description 支持字符串(内置)、对象形式
   */
  rules?: Rule[];

  /**
   * 传递给`FormItem`组件的参数
   * @description 部分属性会不可用，如field、label、required、rules、disabled等
   */
  itemProps?: Omit<FormItemInstance["$props"], "field" | "label" | "required" | "rules" | "disabled">;

  /**
   * 是否可见
   * @description 动态控制表单项是否可见
   */
  visible?: IAnFormItemBoolFn;

  /**
   * 是否禁用
   * @description 动态控制表单项是否禁用
   */
  disable?: IAnFormItemBoolFn;
};

/**
 * 表单项
 */
export type FormItem = BaseFormItem & NodeUnion;
