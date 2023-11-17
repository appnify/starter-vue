import { cloneDeep, merge } from "lodash-es";
import { IAnFormItem } from "../../AnForm/components/FormItem";
import { FormModalProps } from "../../AnForm/components/FormModal";
import { FormModalUseOptions } from "../../AnForm/hooks/useFormModal";
import { ExtendFormItem } from "./useSearchForm";

export type ModifyForm = Omit<FormModalUseOptions, "items"> & {
  /**
   * 是否继承新建弹窗
   */
  extend?: boolean;
  /**
   * 表单项
   */
  items?: ExtendFormItem[];
};

export function useModifyForm(form: ModifyForm, create: FormModalProps) {
  const { extend, items, ...rest } = form;
  let result = {};
  if (extend) {
    cloneDeep(create ?? {});
    const createItems = create.items;
    const modifyItems = form.items;
    if (modifyItems && createItems) {
      for (let i = 0; i < modifyItems.length; i++) {
        if (modifyItems[i].extend) {
          modifyItems[i] = merge({}, createItems[i], modifyItems[i]);
        }
      }
    }
  }
}
