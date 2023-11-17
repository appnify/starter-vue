import { AnForm, IAnForm } from '../components/Form';
import { FormItem, useItems } from './useItems';

export type FormUseOptions = Partial<Omit<IAnForm, 'items'>> & {
  /**
   * 表单项
   * @example
   * ```ts
   * [{
   *     field: 'name',
   *     label: '昵称',
   *     setter: 'input'
   * }]
   * ```
   */
  items?: FormItem[];
};

export function useFormProps(options: FormUseOptions) {
  const _model = options.model ?? {};
  const _items = options.items ?? [];
  const items = useItems(_items, _model);
  const props = reactive({
    formProps: options.formProps ?? {},
    items: items.value,
    submit: options.submit,
    model: _model,
  });
  return props;
}

/**
 * 构建表单组件的参数
 */
export const useForm = (options: FormUseOptions) => {
  const { items: _items = [], model: _model = {}, submit, formProps: _props = {} } = options;
  const items = useItems(_items, _model);
  const model = ref(_model);
  const formProps = ref(_props);
  const formRef = ref<InstanceType<typeof AnForm> | null>(null);

  const AnFormer = () => (
    <AnForm
      ref={(el: any) => (formRef.value = el)}
      v-model:model={model.value}
      items={items.value}
      submit={submit}
      formProps={formProps.value}
    ></AnForm>
  );

  return {
    component: AnFormer,
    model,
    items,
    submit,
    formProps,
    formRef,
  };
};
