import { Ref } from "vue";
import { FormItem } from "../hooks/types/FormItem";

export function useFormItems(items: Ref<FormItem[]>, model: Ref<Recordable>) {
  const getItem = (field: string) => {
    return items.value.find((i) => i.field === field);
  };

  const getItemOptions = (field: string) => {
    const item = getItem(field);
    if (item) {
      return (item.nodeProps as any)?.options;
    }
  };

  const initItemOptions = (field: string) => {
    const item = getItem(field);
    item && item.initial?.();
  };

  const initItems = () => {
    for (const item of items.value) {
      item.initial?.(item, model);
    }
  };

  const initItem = (field: string) => {
    const item = getItem(field);
    item && item.initial(item, model);
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
