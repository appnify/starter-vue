import { Ref } from 'vue';
import { AnFormItemProps } from './FormItem';
import { setterMap } from './FormSetter';

export function useFormItems(items: Ref<AnFormItemProps[]>, model: Ref<Recordable>) {
  const getItem = (field: string) => {
    return items.value.find(i => i.field === field);
  };

  const getItemOptions = (field: string) => {
    const item = getItem(field);
    if (item) {
      return (item.setterProps as any)?.options;
    }
  };

  const initItemOptions = (field: string) => {
    const item = getItem(field);
    if (!item) {
      return;
    }
    const setter = setterMap[item.setter!];
    if (!setter) {
      return;
    }
    setter.onSetup?.({ item, items: items.value, model: model.value });
  };

  const initItems = () => {
    for (const item of items.value) {
      const setter = setterMap[item?.setter!];
      setter.onSetup?.({ item, items: items.value, model: model.value });
    }
  };

  const initItem = (field: string) => {
    const item = getItem(field);
    if (!item) {
      return;
    }
    const setter = setterMap[item?.setter!];
    setter.onSetup?.({ item, items: items.value, model: model.value });
  };

  onMounted(() => {
    initItems();
  });

  return {
    items,
    getItem,
    initItem,
    initItems,
    getItemOptions,
    initItemOptions,
  };
}

export type FormItems = ReturnType<typeof useFormItems>;
