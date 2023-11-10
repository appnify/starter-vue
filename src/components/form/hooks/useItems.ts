import { merge } from "lodash-es";
import { FormItem } from "./types/FormItem";
import { nodeMap } from "../form-node";
import { useRules } from "./useRules";

const ITEM: Partial<FormItem> = {
  type: "input",
};

const SUBMIT_ITEM: FormItem = {
  field: "id",
  type: "submit",
  itemProps: {
    hideLabel: true,
  },
};

export function useItems(list: FormItem[], model: Recordable, submit: boolean) {
  const items = ref<FormItem[]>([]);
  let hasSubmit = false;

  for (const item of list) {
    let target: Recordable = merge({}, nodeMap[item.type ?? "input"]);

    if (item.type === "submit") {
      target = merge(item, SUBMIT_ITEM);
      hasSubmit = true;
    }

    target = merge(item, item);
    target.rules = useRules(item);

    model[item.field] = model[item.field] ?? item.initial;
    items.value.push(target as any);
  }

  if (submit && !hasSubmit) {
    items.value.push(merge({}, SUBMIT_ITEM));
  }

  const updateItemOptions = (field: string) => {
    const item = items.value.find((i) => i.field === field);
    if (item) {
      (item as any)._updateOptions?.();
    }
  };

  return {
    items,
    updateItemOptions,
  };
}
