import { FormInstance } from "@arco-design/web-vue";
import { IFormItem } from "./form-item";
import { merge } from "lodash-es";

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
  const { model: _model = {} } = options;
  const model: Record<string, any> = { id: undefined, ..._model };
  const items: IFormItem[] = [];

  for (const item of options.items) {
    if (!item.nodeProps) {
      item.nodeProps = {} as any;
    }
    model[item.field] = model[item.field] ?? item.initial;
    items.push(item);
  }

  if (options.submit) {
    const submit = items.find((item) => item.type === "submit") || {};
    items.push(
      merge(
        {},
        {
          field: "id",
          type: "submit",
          itemProps: {
            hideLabel: true,
          },
        },
        submit
      ) as any
    );
  }

  return reactive({ ...options, model, items }) as any;
};
