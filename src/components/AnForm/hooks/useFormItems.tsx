import { defaultsDeep, has, merge, omit } from 'lodash-es';
import { AnFormItemProps, AnFormItemPropsBase } from '../components/FormItem';
import { SetterItem, setterMap } from '../components/FormSetter';
import { Rule, useFormRules } from './useFormRules';

/**
 * 表单项数据
 */
export type FormItem = Omit<AnFormItemPropsBase, 'rules'> &
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

    /**
     * 参数 `setterProps.placeholder` 的快捷语法
     * @example
     * ```ts
     * '请输入用户名称'
     * ```
     */
    placeholder?: string | string[];
  };

const ITEM: Partial<FormItem> = {
  setter: 'input',
};

export function useFormItems(items: FormItem[], model: Recordable) {
  const data: AnFormItemProps[] = [];

  for (const item of items) {
    let target: AnFormItemProps = defaultsDeep({}, ITEM);

    if (!item.setter || typeof item.setter === 'string') {
      const setter = setterMap[item.setter ?? 'input'];
      if (setter) {
        defaultsDeep(target, { setterProps: setter.setterProps ?? {} });
      }
    }

    target = merge(target, omit(item, ['required', 'rules', 'value', 'placeholder']));

    if (item.required || item.rules) {
      const rules = useFormRules(item)!;
      target.rules = rules;
    }

    if (target.setterProps && has(item, 'placeholder')) {
      (target.setterProps as Recordable).placholder = item.placeholder;
    }

    if (!has(model, item.field)) {
      model[item.field] = item.value;
    }

    data.push(target);
  }

  return data;
}
