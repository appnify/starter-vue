import { FormInstance } from "@arco-design/web-vue";
import { IFormItem } from "./form-item";
import { useModel } from "./hooks/useModel";
import { useItems } from "./hooks/useItems";

export type Options = {
  /**
   * 表单数据模型
   */
  model?: Record<string, any>;
  /**
   * 表单项数组
   */
  items: IFormItem[];
  /**
   * 提交表单
   */
  submit?: (arg: { model: Record<string, any>; items: IFormItem[] }) => Promise<any>;
  /**
   * 表单实例属性
   */
  formProps?: Partial<FormInstance["$props"]>;
};

/**
 * 构建表单组件的参数
 * @see src/components/form/use-form.tsx
 */
export const useForm = (options: Options) => {
  const initModel = options.model ?? {};
  const { items, updateItemOptions } = useItems(options.items, initModel, Boolean(options.submit));
  const { model, resetModel, setModel, getModel } = useModel(initModel);

  return {
    model,
    items,
    resetModel,
    setModel,
    getModel,
    updateItemOptions,
  };
};
