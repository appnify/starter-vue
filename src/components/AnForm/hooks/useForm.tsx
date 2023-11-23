import { merge } from 'lodash-es';
import { AnForm, AnFormInstance, AnFormProps } from '../components/Form';
import { FormItem, useItems } from './useItems';

export type FormUseOptions = Partial<Omit<AnFormProps, 'items'>> & {
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

export function useFormProps(options: FormUseOptions): Required<AnFormProps> {
  const { model: _model = {}, items: _items = [], submit = () => null, formProps = {} } = options;
  const model = merge({ id: undefined }, _model);
  const items = useItems(_items ?? [], model);
  return {
    model,
    items,
    submit,
    formProps,
  };
}

/**
 * 构建表单组件的参数
 */
export const useForm = (options: FormUseOptions) => {
  const props = reactive(useFormProps(options));
  const formRef = ref<AnFormInstance | null>(null);

  const AnFormer = () => (
    <AnForm
      ref={(el: any) => (formRef.value = el)}
      v-model:model={props.model}
      items={props.items}
      submit={props.submit}
      formProps={props.formProps}
    ></AnForm>
  );

  return {
    component: AnFormer,
    formRef,
    props,
  };
};
