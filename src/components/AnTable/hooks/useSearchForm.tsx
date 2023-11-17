import { defaultsDeep, isArray, merge } from 'lodash-es';
import { FormUseOptions } from '../../AnForm';
import { IAnFormItem } from '../../AnForm/components/FormItem';
import { FormItem, useItems } from '../../AnForm/hooks/useItems';

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

export type SearchFormObject = Omit<FormUseOptions, 'items' | 'submit'> & {
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

export type SearchForm = SearchFormObject | SearchFormItem[];

export function useSearchForm(search?: SearchForm, extendItems: IAnFormItem[] = []) {
  if (!search) {
    return ref();
  }

  if (isArray(search)) {
    search = { items: search };
  }

  const { items: _items = [], hideSearch, model: _model, formProps: _formProps } = search;
  const extendMap = extendItems.reduce((m, v) => ((m[v.field] = v), m), {} as Record<string, IAnFormItem>);

  const props = ref({
    items: [] as IAnFormItem[],
    model: _model ?? {},
    formProps: defaultsDeep({}, _formProps, { layout: 'inline' }),
  });

  const defualts: Partial<IAnFormItem> = {
    setter: 'input',
    itemProps: {
      hideLabel: true,
    },
    setterProps: {},
  };

  const items: any[] = [];
  for (const _item of _items) {
    const { searchable, enterable, field, extend, ...itemRest } = _item;
    if ((field || extend) === 'submit' && hideSearch) {
      continue;
    }
    let item: IAnFormItem = defaultsDeep({}, itemRest, defualts);
    if (extend) {
      const extendItem = extendMap[extend];
      if (extendItem) {
        item = merge({}, extendItem, itemRest);
      }
    }
    if (searchable) {
      (item as any).nodeProps.onSearch = () => null;
    }
    if (enterable) {
      (item as any).nodeProps.onPressEnter = () => null;
    }
    if (item.setterProps) {
      (item.setterProps as any).placeholder = (item.setterProps as any).placeholder ?? item.label;
    }
    items.push(item);
  }

  props.value.items = useItems(items, props.value.model).value;

  return props;
}
