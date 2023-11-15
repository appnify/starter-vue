import { merge } from "lodash-es";
import { FormUseOptions } from "../../AnForm";
import { IAnFormItem } from "../../AnForm/components/FormItem";
import { FormItem } from "../../AnForm/hooks/useItems";

export type ExtendFormItem = Partial<
  FormItem & {
    /**
     * 从新建弹窗继承表单项
     * @example 'name'
     */
    extend: string;
  }
>;

type SearchFormItem = ExtendFormItem & {
  /**
   * 是否点击图标后进行搜索
   * @default false
   */
  searchable?: boolean;
  /**
   * 是否回车后进行查询
   * @default false
   */
  enterable?: boolean;
};

export type SearchForm = Omit<FormUseOptions, "items"> & {
  /**
   * 搜索表单项
   */
  items?: SearchFormItem[];
  /**
   * 是否隐藏查询按钮
   * @default false
   */
  hideSearch?: boolean;
};

export function useSearchForm(search: SearchForm, extendItems: IAnFormItem[] = []) {
  const data: any[] = [];
  const { items = [], hideSearch, ...rest } = search;

  for (const item of items) {
    const { searchable, enterable, ...itemRest } = item;
    let _item;
    if (item.extend) {
      const extend = extendItems.find((i) => i.field === item.extend);
      if (extend) {
        _item = merge({}, extend, itemRest);
      }
    }
    if (searchable) {
      (item as any).nodeProps.onSearch = () => null;
    }
    if (enterable) {
      (item as any).nodeProps.onPressEnter = () => null;
    }
    data.push(_item);
  }

  if (hideSearch) {
    const index = data.findIndex((i) => i.type === "submit");
    if (index > -1) {
      data.splice(index, 1);
    }
  }

  return {
    items: data,
  };
}
