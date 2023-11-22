import { Form, FormInstance } from '@arco-design/web-vue';
import { useVModel } from '@vueuse/core';
import { PropType } from 'vue';
import { FormContextKey } from './useFormContext';
import { useFormItems } from './useFormItems';
import { useFormModel } from './useFormModel';
import { useFormRef } from './useFormRef';
import { useFormSubmit } from './useFormSubmit';
import { AnFormItem, AnFormItemProps } from './FormItem';

/**
 * 表单组件
 */
export const AnForm = defineComponent({
  name: 'AnForm',
  props: {
    /**
     * 表单数据
     * @example
     * ```ts
     * {
     *   id: undefined
     * }
     * ```
     */
    model: {
      type: Object as PropType<Recordable>,
      default: () => ({}),
    },
    /**
     * 表单项
     * @example
     * ```ts
     * [{
     *   field: 'name',
     *   label: '昵称',
     *   setter: 'input'
     * }]
     * ```
     */
    items: {
      type: Array as PropType<AnFormItemProps[]>,
      default: () => [],
    },
    /**
     * 提交表单
     * @example
     * ```ts
     * (model) => api.user.addUser(model)
     * ```
     */
    submit: {
      type: [String, Function, Object] as PropType<AnFormSubmit>,
    },
    /**
     * 传给Form组件的参数
     * @exmaple
     * ```ts
     * {
     *   layout: 'vertical'
     * }
     * ```
     */
    formProps: {
      type: Object as PropType<Omit<FormInstance['$props'], 'model' | 'ref'>>,
    },
  },
  emits: ['update:model'],
  setup(props, { slots, emit }) {
    const model = useVModel(props, 'model', emit);
    const items = computed(() => props.items);
    const formRefes = useFormRef();
    const formModel = useFormModel(model, formRefes.clearValidate);
    const formItems = useFormItems(items, model);
    const formSubmit = useFormSubmit(props, formRefes.validate, formModel.getModel);
    const context = { slots, ...formModel, ...formItems, ...formRefes, ...formSubmit };

    provide(FormContextKey, context);
    return context;
  },
  render() {
    return (
      <Form layout="vertical" {...this.$attrs} {...this.formProps} class="an-form" ref="formRef" model={this.model}>
        {this.items.map(item => (
          <AnFormItem key={item.field} item={item} items={this.items} model={this.model}></AnFormItem>
        ))}
        {this.$slots.submit?.(this.model, this.validate) ||
          (this.submit && this.submitItem && (
            <AnFormItem item={this.submitItem} items={this.items} model={this.model}></AnFormItem>
          ))}
      </Form>
    );
  },
});

export type AnFormInstance = InstanceType<typeof AnForm>;

export type AnFormProps = Pick<AnFormInstance['$props'], 'model' | 'items' | 'submit' | 'formProps'>;

export type AnFormSubmitFn = (model: Recordable, items: AnFormItemProps[]) => any;

export type AnFormSubmit = string | AnFormSubmitFn;
