import { defaultsDeep, merge, omit } from "lodash-es";
import { NodeType, nodeMap } from "../nodes";
import { FormItem } from "./types/FormItem";
import { useRules } from "./useRules";
import { IAnFormItem } from "../components/FormItem";

const ITEM: Partial<FormItem> = {
  render: "input",
  itemProps: {},
};

const SUBMIT_ITEM: FormItem = {
  field: "id",
  render: "submit",
  itemProps: {
    hideLabel: true,
  },
};

export function useItems(list: FormItem[], model: Recordable, submit: boolean) {
  const items = ref<IAnFormItem[]>([]);
  let hasSubmit = false;

  for (const item of list) {
    let target: any = defaultsDeep({}, ITEM);

    if (!item.render || typeof item.render === "string") {
      const defaults = nodeMap[item.render ?? "input"];
      if (defaults) {
        defaultsDeep(target, defaults);
      }
    }

    if (item.render === "submit") {
      target = merge(target, SUBMIT_ITEM);
      hasSubmit = true;
    }

    target = merge(target, omit(item, ["required", "rules"]));

    const rules = useRules(item);
    if (rules) {
      target.rules = rules;
    }

    model[item.field] = model[item.field] ?? item.value;
    items.value.push(target);
  }

  if (submit && !hasSubmit) {
    items.value.push(defaultsDeep({}, SUBMIT_ITEM, nodeMap.submit));
  }

  return items;
}
