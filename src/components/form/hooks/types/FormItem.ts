import { FormItemInstance, SelectOptionData } from "@arco-design/web-vue";
import { Rule } from "../useRules";
import { NodeUnion } from "../../form-node";

/**
 * 函数参数
 */
export type FormItemFnArg<T = FormItem> = {
  item: T;
  items: T[];
  model: Recordable;
};

/**
 * 表单项基础
 */
type BaseFormItem = {
  /**
   * 传递给`FormItem`组件的参数
   * @description 部分属性会不可用，如field、label、required、rules、disabled等
   */
  itemProps?: Omit<FormItemInstance["$props"], "field" | "label" | "required" | "rules" | "disabled">;

  /**
   * 是否可见
   * @description 动态控制表单项是否可见
   */
  visible?: (arg: FormItemFnArg) => boolean;

  /**
   * 是否禁用
   * @description 动态控制表单项是否禁用
   */
  disable?: (arg: FormItemFnArg) => boolean;

  /**
   * 选项，数组或者函数
   * @description 用于下拉框、单选框、多选框等组件, 支持动态加载
   */
  options?: SelectOptionData[] | ((arg: FormItemFnArg) => PromiseLike<Recordable[]>);
};

/**
 * 表单项插槽
 */
type BaseFormItemSlots = {
  /**
   * 渲染函数
   * @description 用于自定义表单项内容
   */
  render?: (args: FormItemFnArg) => any;

  /**
   * 标签名
   * @description 同FormItem组件的label属性
   */
  label?: string | ((args: FormItemFnArg) => any);

  /**
   * 帮助提示
   * @description 同FormItem组件的help插槽
   * @see https://arco.design/vue/component/form#form-item%20Slots
   */
  help?: string | ((args: FormItemFnArg) => any);

  /**
   * 额外内容
   * @description 同FormItem组件的extra插槽
   * @see https://arco.design/vue/component/form#form-item%20Slots
   */
  extra?: string | ((args: FormItemFnArg) => any);
};

/**
 * 表单项校验
 */
type BaseFormItemRules = {
  /**
   * 是否必填
   * @description 默认值为false
   */
  required?: boolean;

  /**
   * 校验规则
   * @description 支持字符串(内置)、对象形式
   * @see https://arco.design/vue/component/form#FieldRule
   */
  rules?: Rule<FormItem>[];
};

/**
 * 表单项数据
 */
type BaseFormItemModel = {
  /**
   * 字段名，特殊语法在提交时会自动转换。
   * @example
   * ```typescript
   * '[v1,v2]' => { v1: 1, v2: 2 }
   * ```
   */
  field: string;

  /**
   * 初始值
   * @description 若指定该参数，将覆盖model中的同名属性。
   */
  initial?: any;
};

/**
 * 表单项
 */
export type FormItem = BaseFormItem & BaseFormItemModel & BaseFormItemRules & BaseFormItemSlots & NodeUnion;
