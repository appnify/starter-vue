import { defaultsDeep, merge, omit } from "lodash-es";
import { Rule, useRules } from "./useRules";
import { IAnFormItem } from "../components/FormItem";
import { setterMap } from "../components/FormSetter";

/**
 * 表单项数据
 */
export type FormItem = Omit<IAnFormItem, "rules"> & {
  /**
   * 默认值
   * @example 1
   */
  value?: any;

  /**
   * 是否必填
   * @default false
   */
  required?: boolean;

  /**
   * 校验规则
   * @example ['email']
   */
  rules?: Rule[];
};

const ITEM: Partial<FormItem> = {
  setter: "input",
  itemProps: {},
};

const SUBMIT_ITEM: FormItem = {
  field: "id",
  setter: "submit",
  itemProps: {
    hideLabel: true,
  },
};

export function useItems(list: FormItem[], model: Recordable, submit: boolean) {
  const items = ref<IAnFormItem[]>([]);
  let hasSubmit = false;

  for (const item of list) {
    let target: any = defaultsDeep({}, ITEM);

    if (!item.setter || typeof item.setter === "string") {
      const defaults = setterMap[item.setter ?? "input"];
      if (defaults) {
        defaultsDeep(target, defaults);
      }
    }

    if (item.setter === "submit") {
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
    items.value.push(defaultsDeep({}, SUBMIT_ITEM, setterMap.submit));
  }

  return items;
}
