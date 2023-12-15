import { AnFormItemProps } from '../components/FormItem';
import { setterMap } from '../components/FormSetter';

export const getFormItem = (items: AnFormItemProps[], field: string) => {
  return items.find(i => i.field === field);
};

export const initFormItems = (items: AnFormItemProps[], model: Recordable) => {
  for (const item of items) {
    const setter = setterMap[item.setter!];
    setter.onSetup?.({ item, items, model });
  }
};