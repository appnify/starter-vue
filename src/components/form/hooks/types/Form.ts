import { FormInstance } from "@arco-design/web-vue";
import { FormItem, FormItemFnArg } from "./FormItem";

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
  submit?: string | ((arg: any) => PromiseLike<any>);
  /**
   * 实例属性
   * @description 透传给表单组件的参数
   */
  formProps?: FormInstanceProps;
};
