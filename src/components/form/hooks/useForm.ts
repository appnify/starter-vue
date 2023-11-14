import { useItems } from "./useItems";
import { FormInstance } from "@arco-design/web-vue";
import { FormItem } from "./types/FormItem";
import { IAnForm, IAnFormSubmit } from "../components/Form";

type FormInstanceProps = Partial<Omit<FormInstance["$props"], "model">>;

export type UseForm = {
  /**
   * 表单数据
   */
  model?: Recordable;
  /**
   * 表单项
   */
  items?: FormItem[];
  /**
   * 提交表单
   * @description 支持请求地址和请求函数
   */
  submit?: IAnFormSubmit;
  /**
   * 实例属性
   * @description 透传给表单组件的参数
   */
  formProps?: FormInstanceProps;
};

/**
 * 构建表单组件的参数
 */
export const useForm = (options: UseForm) => {
  const { items: _items = [], model: _model = {}, submit, formProps: _props = {} } = options;
  const items = useItems(_items, _model, Boolean(options.submit));
  const model = ref(_model);
  const formProps = ref(_props);

  return {
    model,
    items,
    formProps,
    submit,
  };
};
