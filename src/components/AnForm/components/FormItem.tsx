import {
  FormItem as BaseFormItem,
  FieldRule,
  FormItemInstance,
  SelectOptionData,
  SelectOptionGroup,
} from '@arco-design/web-vue';
import { InjectionKey, PropType, provide } from 'vue';
import { SetterItem, SetterType, setterMap } from './FormSetter';

export const FormItemContextKey = Symbol('FormItemContextKey') as InjectionKey<any>;

/**
 * 表单项
 */
export const AnFormItem = defineComponent({
  name: 'AnFormItem',
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
    const rules = computed(() => props.item.rules?.filter(i => !i.disable?.(props)));
    const disabled = computed(() => Boolean(props.item.disable?.(props)));

    const setterSlots = computed(() => {
      const slots = props.item.setterSlots;
      if (!slots) {
        return null;
      }
      const items: Recordable = {};
      for (const [name, Slot] of Object.entries(slots)) {
        items[name] = () => <Slot {...props} />;
      }
      return items;
    });

    const contentRender = () => {
      const Slot = props.item.itemSlots?.default;
      if (Slot) {
        return <Slot {...props} />;
      }
      const Setter = setterMap[props.item.setter as SetterType]?.setter as any;
      if (!Setter) {
        return null;
      }
      return (
        <Setter {...props.item.setterProps} v-model={props.model[props.item.field]}>
          {setterSlots.value}
        </Setter>
      );
    };

    const makeSlot = (name: 'help' | 'extra' | 'label' | 'default') => {
      return () => {
        const Slot = props.item.itemSlots?.[name];
        return Slot ? () => <Slot {...props} /> : null;
      };
    };

    const help = computed(makeSlot('help'));
    const extra = computed(makeSlot('extra'));
    const label = computed(makeSlot('label'));

    provide(FormItemContextKey, props);

    return () => {
      if (props.item.visible && !props.item.visible(props)) {
        return null;
      }
      return (
        <BaseFormItem
          {...props.item.itemProps}
          label={props.item.label as string}
          rules={rules.value}
          disabled={disabled.value}
          field={props.item.field}
        >
          {{
            default: contentRender,
            help: help.value,
            extra: extra.value,
            label: label.value,
          }}
        </BaseFormItem>
      );
    };
  },
});

export type IAnFormItemBoolFn = (args: IAnFormItemFnProps) => boolean;

export type IAnFormItemElemFn = (args: IAnFormItemFnProps) => any;

export type IAnFormItemFnProps = { model: Recordable; item: IAnFormItem; items: IAnFormItem[] };

export type IAnFormItemRule = FieldRule & { disable?: IAnFormItemBoolFn };

export type IAnFormItemOption = string | number | boolean | SelectOptionData | SelectOptionGroup;

export type IAnFormItemSlot = (props: IAnFormItemFnProps) => any;

export type IAnFormItemSlots = {
  /**
   * 默认插槽
   * @param props 参数
   * @returns
   */
  default?: IAnFormItemSlot;
  /**
   * 帮助插槽
   * @param props 参数
   * @returns
   */
  help?: IAnFormItemSlot;
  /**
   * 额外插槽
   * @param props 参数
   * @returns
   */
  extra?: IAnFormItemSlot;
  /**
   * 标签插槽
   * @param props 参数
   * @returns
   */
  label?: IAnFormItemSlot;
};

export type IAnFormItemBase = {
  /**
   * 字段名
   * @description 字段名唯一，支持特殊语法
   * @example
   * ```ts
   * 'username'
   * ```
   */
  field: string;

  /**
   * 标签
   * @example 
   * ```ts
   * '昵称'
   * ```
   */
  label?: string;

  /**
   * 校验规则
   * @example ['email']
   */
  rules?: IAnFormItemRule[];

  /**
   * 是否可见
   * @example 
   * ```ts
   * (props) => Boolean(props.model.id)
   * ```
   */
  visible?: IAnFormItemBoolFn;

  /**
   * 是否禁用
   * @example 
   * ```ts
   * (props) => Boolean(props.model.id)
   * ```
   */
  disable?: IAnFormItemBoolFn;

  /**
   * 选项
   * @description 适用于下拉框等组件
   * @example
   * ```ts
   * [{ label: '方式1', value: 1 }]
   * ```
   */
  options?: IAnFormItemOption[] | ((args: IAnFormItemFnProps) => IAnFormItemOption[] | Promise<IAnFormItemOption[]>);

  /**
   * 表单项参数
   * @default null
   */
  itemProps?: Partial<Omit<FormItemInstance['$props'], 'field' | 'label' | 'required' | 'rules' | 'disabled'>>;

  /**
   * 表单项插槽
   * @see 1
   */
  itemSlots?: IAnFormItemSlots;
};

export type IAnFormItem = IAnFormItemBase & SetterItem;
