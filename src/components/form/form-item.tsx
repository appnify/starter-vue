import { FormItem as BaseFormItem, FormItemInstance, SelectOptionData } from "@arco-design/web-vue";
import { NodeUnion, nodeMap } from "./form-node";
import { FieldObjectRule, FieldRuleMap, Rule } from "./form-rules";
import { PropType } from "vue";
import { strOrFnRender } from "./util";

/**
 * 表单项
 */
export const FormItem = defineComponent({
  name: "AppnifyFormItem",
  props: {
    /**
     * 表单项
     */
    item: {
      type: Object as PropType<IFormItem>,
      required: true,
    },
    /**
     * 表单项数组
     */
    items: {
      type: Array as PropType<IFormItem[]>,
      required: true,
    },
    /**
     * 表单数据
     */
    model: {
      type: Object as PropType<Recordable>,
      required: true,
    },
  },
  setup(props) {
    /**
     * 校验规则
     */
    const rules = computed(() => props.item.rules?.filter((i) => !i.disable?.(props)));

    /**
     * 是否禁用
     */
    const disabled = computed(() => Boolean(props.item.disable?.(props)));

    if (props.item.visible && !props.item.visible(props as any)) {
      return null;
    }

    /**
     * 渲染函数
     */
    const render = () => {
      const Item = props.item.component as any;
      if (props.item.type === "custom") {
        return <Item {...props.item.nodeProps} items={props.items} model={props.model} item={props.item} />;
      }
      return <Item {...props.item.nodeProps} v-model={props.model[props.item.field]} />;
    };

    /**
     * 标签渲染
     */
    const label = strOrFnRender(props.item.label, props);

    /**
     * 帮助信息渲染函数
     */
    const help = strOrFnRender(props.item.help, props);

    /**
     * 额外信息渲染函数
     */
    const extra = strOrFnRender(props.item.extra, props);

    return () => (
      <BaseFormItem {...props.item.itemProps} rules={rules.value} disabled={disabled.value} field={props.item.field}>
        {{ default: render, label, help, extra }}
      </BaseFormItem>
    );
  },
});

type FormItemFnArg<T = IFormItem> = {
  item: T;
  items: T[];
  model: Record<string, any>;
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
  label?: string | ((args: FormItemFnArg) => any);

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
  rules?: FieldObjectRule<IFormItem>[];

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
  options?: SelectOptionData[] | ((arg: FormItemFnArg) => Promise<any>);

  /**
   * 表单项内容的渲染函数
   * @description 用于自定义表单项内容
   */
  component?: (args: FormItemFnArg) => any;

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

export type IFormItem = FormItemBase & NodeUnion;
