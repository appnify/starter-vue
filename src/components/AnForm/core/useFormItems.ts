import { Ref } from "vue";
import { IAnFormItem } from "../components/FormItem";

export function useFormItems(items: Ref<IAnFormItem[]>, model: Ref<Recordable>) {
  const getItem = (field: string) => {
    return items.value.find((i) => i.field === field);
  };

  const getItemOptions = (field: string) => {
    const item = getItem(field);
    if (item) {
      return (item.setterProps as any)?.options;
    }
  };

  const initItemOptions = (field: string) => {
    const item = getItem(field);
    item && item.init?.();
  };

  const initItems = () => {
    for (const item of items.value) {
      item.init?.({ item, model: model.value });
    }
  };

  const initItem = (field: string) => {
    const item = getItem(field);
    item && item.init?.({ item, model: model.value });
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
