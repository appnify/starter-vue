import { UseForm } from "./types/Form";
import { useItems } from "./useItems";

/**
 * 构建表单组件的参数
 */
export const useForm = (options: UseForm) => {
  const { model: _model = {}, items: _items = [], submit, formProps: _formProps } = options;
  const items = ref(useItems(_items, _model, Boolean(options.submit)))
  const model = ref(_model);
  const formProps = ref(_formProps);

  return {
    model,
    items,
    submit,
    formProps,
  };
};
