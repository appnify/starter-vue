import { FormItem } from '@/components/AnForm/hooks/useItems';
import { merge } from 'lodash-es';
import { FormModalUseOptions } from '../../AnForm/hooks/useFormModal';
import { ExtendFormItem } from './useSearchForm';
import { TableUseOptions } from './useTable';

export type ModifyForm = Omit<FormModalUseOptions, 'items'> & {
  /**
   * 是否继承新建弹窗
   */
  extend?: boolean;
  /**
   * 表单项
   */
  items?: ExtendFormItem[];
};

export function useModifyForm(options: TableUseOptions) {
  const { create, modify } = options;
  if (!modify) {
    return null;
  }
  const { extend, items, ...rest } = modify;
  let result = {};
  if (extend && create) {
    const { items: createItems, ...createRest } = create;
    const createItemMap = createItems.reduce((map, value) => {
      map[value.field] = value;
      return map;
    }, {} as Record<string, FormItem>);
    const modified: any = merge({}, createRest, rest);
    const modifyItems = items;
    if (modifyItems) {
      for (let i = 0; i < modifyItems.length; i++) {
        if (modifyItems[i].extend) {
          modifyItems[i] = merge({}, createItemMap[modifyItems[i].field!], modifyItems[i]);
        }
      }
    }
    modified.items = modifyItems;
  }
}
