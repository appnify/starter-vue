import { FormItem, useItems } from "./useItems";
import { AnForm, IAnForm } from "../components/Form";

export type UseForm = Partial<Omit<IAnForm, "items">> & {
  /**
   * 表单项
   */
  items?: FormItem[];
};

/**
 * 构建表单组件的参数
 */
export const useForm = (options: UseForm) => {
  const { items: _items = [], model: _model = {}, submit, formProps: _props = {} } = options;
  const items = useItems(_items, _model, Boolean(options.submit));
  const model = ref(_model);
  const formProps = ref(_props);
  const instance = ref<InstanceType<typeof AnForm> | null>(null);

  const component = () => {
    const onUpdateModel = (value: Recordable) => {
      model.value = value;
    };
    return (
      <AnForm
        ref={(el: any) => (instance.value = el)}
        model={model.value}
        onUpdate:model={onUpdateModel}
        items={items.value}
        submit={submit}
        formProps={formProps.value}
      ></AnForm>
    );
  };

  return {
    component,
    instance,
    model,
    items,
    formProps,
    submit,
  };
};
