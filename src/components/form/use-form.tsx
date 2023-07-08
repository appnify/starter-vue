import { FormInstance } from "@arco-design/web-vue";
import { IFormItem } from "./form-item";

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
  const { model = { id: undefined } } = options;
  const items: IFormItem[] = [];

  options.items.forEach((item) => {
    if (!item.nodeProps) {
      item.nodeProps = {} as any;
    }
    if (/(.+)\?(.+)/.test(item.field)) {
      const [field, condition] = item.field.split("?");
      model[field] = item.initialValue ?? model[item.field];
      const params = new URLSearchParams(condition);
      for (const [key, value] of params.entries()) {
        model[key] = value;
      }
    }
    model[item.field] = model[item.field] ?? item.initialValue;
    const _item = { ...item };
    items.push(_item);
  });

  if (options.submit) {
    const submit = items.find((item) => item.type === "submit");
    if (!submit) {
      items.push({
        field: "id",
        type: "submit",
        itemProps: {
          hideLabel: true,
        },
      });
    }
  }

  return reactive({ ...options, model, items }) as any;
};
