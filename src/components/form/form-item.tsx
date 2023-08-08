import { FormItem as BaseFormItem, FieldRule, FormItemInstance, SelectOptionData } from "@arco-design/web-vue";
import { NodeType, NodeUnion, nodeMap } from "./form-node";
import { RuleMap } from "./form-rules";

export type FieldStringRule = keyof typeof RuleMap;
export type FieldObjectRule = FieldRule & {
  disable?: (arg: { item: IFormItem; model: Record<string, any> }) => boolean;
};
export type FieldRuleType = FieldStringRule | FieldObjectRule;

/**
 * 表单项
 */
export const FormItem = (props: any, { emit }: any) => {
  const { item } = props;
  const args = {
    ...props,
    field: item.field,
  };

  const rules = computed(() => {
    const result = [];
    if (item.required) {
      result.push(RuleMap.required);
    }
    item.rules?.forEach((rule: any) => {
      if (typeof rule === "string") {
        result.push(RuleMap[rule as FieldStringRule]);
        return;
      }
      if (!rule.disable) {
        result.push(rule);
        return;
      }
      if (!rule.disable({ model: props.model, item, items: props.items })) {
        result.push(rule);
      }
    });
    return result;
  });

  const disabled = computed(() => {
    if (item.disable === undefined) {
      return false;
    }
    if (typeof item.disable === "function") {
      return item.disable(args);
    }
    return item.disable;
  });

  if (item.visible && !item.visible(args)) {
    return null;
  }

  return (
    <BaseFormItem {...item.itemProps} rules={rules.value} disabled={disabled.value} field={item.field}>
      {{
        default: () => {
          if (item.component) {
            return <item.component {...item.nodeProps} />;
          }
          const comp = nodeMap[item.type as NodeType]?.component;
          if (!comp) {
            return null;
          }
          if (item.type === "submit") {
            return <comp loading={props.loading} onSubmit={() => emit("submit")} onCancel={emit("cancel")} />;
          }
          return <comp v-model={props.model[item.field]} {...item.nodeProps} />;
        },
        label: item.label && (() => (typeof item.label === "string" ? item.label : item.label?.(args))),
        help: item.help && (() => (typeof item.help === "string" ? item.help : item.help?.(args))),
        extra: item.extra && (() => (typeof item.extra === "string" ? item.extra : item.extra?.(args))),
      }}
    </BaseFormItem>
  );
};

type FormItemBase = {
  /**
   * 字段名，用于表单、校验和输入框绑定，支持特殊语法。
   * @example
   * ```typescript
   * {
   *   field: '[v1,v2]',
   *   type: 'dateRange',
   * }
   * // 将得到
   * {
   *   v1: '2021',
   *   v2: '2021',
   * }
   * ```
   */
  field: string;

  /**
   * 初始值
   * @description 若指定该参数，将覆盖model中的同名属性。
   */
  initial?: any;

  /**
   * 标签名
   * @description 同FormItem组件的label属性
   */
  label?: string | ((item: IFormItem, model: Record<string, any>) => any);

  /**
   * 传递给`FormItem`组件的参数
   * @description 部分属性会不可用，如field、label、required、rules、disabled等
   */
  itemProps?: Partial<Omit<FormItemInstance["$props"], "field" | "label" | "required" | "rules" | "disabled">>;

  /**
   * 是否必填
   * @description 默认值为false
   */
  required?: boolean;

  /**
   * 校验规则数组
   * @description 支持字符串(内置)、对象形式
   * @example
   * ```typescript
   * rules: [
   *   // 内置
   *  'idcard',
   *   // 自定义
   *   {
   *    match: /\d+/,
   *    message: '请输入数字',
   *   },
   * ]
   *```
   * @see https://arco.design/vue/component/form#FieldRule
   */
  rules?: FieldRuleType[];

  /**
   * 是否可见
   * @description 动态控制表单项是否可见
   */
  visible?: (arg: { item: IFormItem; model: Record<string, any> }) => boolean;

  /**
   * 是否禁用
   * @description 动态控制表单项是否禁用
   */
  disable?: (arg: { item: IFormItem; model: Record<string, any> }) => boolean;

  /**
   * 选项，数组或者函数
   * @description 用于下拉框、单选框、多选框等组件, 支持动态加载
   */
  options?: SelectOptionData[] | ((arg: { item: IFormItem; model: Record<string, any> }) => Promise<any>);

  /**
   * 表单项内容的渲染函数
   * @description 用于自定义表单项内容
   */
  component?: (args: { item: IFormItem; model: Record<string, any>; field: string }) => any;

  /**
   * 帮助提示
   * @description 同FormItem组件的help插槽
   * @see https://arco.design/vue/component/form#form-item%20Slots
   */
  help?: string | ((args: { item: IFormItem; model: Record<string, any> }) => any);

  /**
   * 额外内容
   * @description 同FormItem组件的extra插槽
   * @see https://arco.design/vue/component/form#form-item%20Slots
   */
  extra?: string | ((args: { item: IFormItem; model: Record<string, any> }) => any);
};

export type IFormItem = FormItemBase & NodeUnion;
