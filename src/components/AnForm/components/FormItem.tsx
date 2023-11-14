import { FormItem as BaseFormItem, FieldRule, FormItemInstance } from "@arco-design/web-vue";
import { isFunction } from "lodash-es";
import { PropType } from "vue";
import { SetterItem, SetterType, setterMap } from "./FormSetter";

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
    const rules = computed(() => props.item.rules?.filter((i) => !i.disable?.(props.model, props.item, props.items)));
    const disabled = computed(() => Boolean(props.item.disable?.(props.model, props.item, props.items)));
    const label = strOrFnRender(props.item.label, props);
    const help = strOrFnRender(props.item.help, props);
    const extra = strOrFnRender(props.item.extra, props);

    const render = () => {
      let render = props.item.setter as any;
      if (!render) {
        return null;
      }
      if (typeof render === "string") {
        render = setterMap[render as SetterType]?.render;
        if (!render) {
          return null;
        }
        return <render {...props.item.nodeProps} v-model={props.model[props.item.field]} />;
      }
      if (isFunction(render)) {
        return <render {...props.item.nodeProps} items={props.items} model={props.model} item={props.item} />;
      }
    };

    return () => {
      if (props.item.visible && !props.item.visible(props.model, props.item, props.items)) {
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

export function strOrFnRender(fn: any, ...args: any[]) {
  if (typeof fn === "string") {
    return () => fn;
  }
  if (typeof fn === "function") {
    return fn(...args);
  }
  return null;
}

export type IAnFormItemBoolFn = (model: Recordable, item: IAnFormItem, items: IAnFormItem[]) => boolean;

export type IAnFormItemElemFn = (model: Recordable, item: IAnFormItem, items: IAnFormItem[]) => any;

export type IAnFormItemRule = FieldRule & { disable?: IAnFormItemBoolFn };

export type IAnFormItemBase = {
  /**
   * 字段名
   * @description 请保持唯一，支持特殊语法
   * @required
   */
  field: string;

  /**
   * 透传的表单项参数
   * @default null
   */
  itemProps?: Partial<Omit<FormItemInstance["$props"], "field" | "label" | "required" | "rules" | "disabled">>;

  /**
   * 校验规则
   */
  rules?: IAnFormItemRule[];

  /**
   * 是否可见
   */
  visible?: IAnFormItemBoolFn;

  /**
   * 是否禁用
   */
  disable?: IAnFormItemBoolFn;

  /**
   * 标签名
   */
  label?: string | IAnFormItemElemFn;

  /**
   * 帮助提示
   */
  help?: string | IAnFormItemElemFn;

  /**
   * 额外内容
   */
  extra?: string | IAnFormItemElemFn;

  options?: any;

  init?: any;
};

export type IAnFormItem = IAnFormItemBase & SetterItem;
