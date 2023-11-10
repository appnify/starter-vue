import { FormInstance } from "@arco-design/web-vue";
import { FormItem, FormItemFnArg } from "./FormItem";

export type UseForm = {
  /**
   * 表单数据模型
   */
  model?: Recordable;
  /**
   * 表单项数组
   */
  items?: FormItem[];
  /**
   * 提交表单
   */
  submit?: (arg: Omit<FormItemFnArg, "item">) => PromiseLike<any>;
  /**
   * 表单实例属性
   */
  formProps?: Partial<FormInstance["$props"]>;
};
