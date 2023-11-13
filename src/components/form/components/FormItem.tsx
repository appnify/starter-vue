import { FormItem as BaseFormItem, FormItemInstance } from "@arco-design/web-vue";
import { isFunction } from "lodash-es";
import { PropType } from "vue";
import { FieldObjectRule } from "../hooks/useRules";
import { NodeType, NodeUnion, nodeMap } from "../nodes";
import { strOrFnRender } from "../utils/strOrFnRender";

/**
 * 表单项
 */
export const AnFormItem = defineComponent({
  name: "AnFormItem",
  props: {
    /**
     * 表单项
     */
    item: {
      type: Object as PropType<IAnFormItem>,
      required: true,
    },
    /**
     * 表单项数组
     */
    items: {
      type: Array as PropType<IAnFormItem[]>,
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

    /**
     * 渲染函数
     */
    const render = () => {
      let render = (props.item as any).render;
      if (!render) {
        return null;
      }
      if (typeof render === "string") {
        render = nodeMap[render as NodeType]?.render;
        if (!render) {
          return null;
        }
        return <render {...props.item.nodeProps} v-model={props.model[props.item.field]} />;
      }
      if (isFunction(render)) {
        return <render {...props.item.nodeProps} items={props.items} model={props.model} item={props.item} />;
      }
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

    return () => {
      if (props.item.visible && !props.item.visible(props)) {
        return null;
      }
      return (
        <BaseFormItem {...props.item.itemProps} rules={rules.value} disabled={disabled.value} field={props.item.field}>
          {{ default: render, label, help, extra }}
        </BaseFormItem>
      );
    };
  },
});

type FormItemFnArg<T = IAnFormItem> = {
  item: T;
  items: T[];
  model: Record<string, any>;
};

type FormItemBase = {
  /**
   * 字段名，用于表单、校验和输入框绑定，支持特殊语法。
   */
  field: string;

  /**
   * 传递给`FormItem`组件的参数
   */
  itemProps?: Partial<Omit<FormItemInstance["$props"], "field" | "label" | "required" | "rules" | "disabled">>;

  /**
   * 校验规则数组
   */
  rules?: FieldObjectRule<IAnFormItem>[];

  /**
   * 是否可见
   */
  visible?: (arg: FormItemFnArg) => boolean;

  /**
   * 是否禁用
   */
  disable?: (arg: FormItemFnArg) => boolean;

  /**
   * 标签名
   */
  label?: string | ((args: FormItemFnArg) => any);

  /**
   * 帮助提示
   */
  help?: string | ((args: FormItemFnArg) => any);

  /**
   * 额外内容
   */
  extra?: string | ((args: FormItemFnArg) => any);
};

export type IAnFormItem = FormItemBase & NodeUnion;
