import { merge } from "lodash-es";
import { nodeMap } from "../nodes";
import { FormItem } from "./types/FormItem";
import { useRules } from "./useRules";

const ITEM: Partial<FormItem> = {
  render: "input",
};

const SUBMIT_ITEM: FormItem = {
  field: "id",
  render: "submit",
  itemProps: {
    hideLabel: true,
  },
};

export function useItems(list: FormItem[], model: Recordable, submit: boolean) {
  const items = [];
  let hasSubmit = false;

  for (const item of list) {
    let target: Recordable = merge({}, nodeMap[typeof item.render === "string" ? item.render : "input"]);

    if (item.render === "submit") {
      target = merge(item, SUBMIT_ITEM);
      hasSubmit = true;
    }

    target = merge(item, item);
    target.rules = useRules(item);

    model[item.field] = model[item.field] ?? item.initial;
    items.push(target as any);
  }

  if (submit && !hasSubmit) {
    items.push(merge({}, SUBMIT_ITEM));
  }

  return items;
}
