import { defaultsDeep, merge, omit } from 'lodash-es';
import { IAnFormItem, IAnFormItemBase } from '../components/FormItem';
import { SetterItem, setterMap } from '../components/FormSetter';
import { Rule, useRules } from './useRules';

/**
 * 表单项数据
 */
export type FormItem = Omit<IAnFormItemBase, 'rules'> &
  SetterItem & {
    /**
     * 默认值
     * @example
     * ```ts
     * '1'
     * ```
     */
    value?: any;

    /**
     * 是否必填
     * @default
     * ```ts
     * false
     * ```
     */
    required?: boolean;

    /**
     * 校验规则
     * @example
     * ```ts
     * ['email']
     * ```
     */
    rules?: Rule[];
  };

const ITEM: Partial<FormItem> = {
  setter: 'input',
};

export function useItems(list: FormItem[], model: Recordable) {
  const items = ref<IAnFormItem[]>([]);

  for (const item of list) {
    let target: any = defaultsDeep({}, ITEM);

    if (!item.setter || typeof item.setter === 'string') {
      const setter = setterMap[item.setter ?? 'input'];
      if (setter) {
        defaultsDeep(target, { setterProps: setter.setterProps ?? {} });
      }
    }

    target = merge(target, omit(item, ['required', 'rules', 'value']));

    const rules = useRules(item);
    if (rules) {
      target.rules = rules;
    }

    model[item.field] = model[item.field] ?? item.value;
    items.value.push(target);
  }

  return items;
}
