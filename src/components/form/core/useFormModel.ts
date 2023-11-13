import { cloneDeep } from "lodash-es";
import { Ref } from "vue";

/**
 * 表单数据管理
 * @param initial 初始值
 * @returns
 */
export function useFormModel(model: Ref<Recordable>) {
  const initial = cloneDeep(model.value);

  const resetModel = () => {
    model.value = cloneDeep(initial);
  };

  const getInitialModel = () => {
    return initial;
  };

  const setModel = (data: Recordable) => {
    for (const key of Object.keys(model.value)) {
      model.value[key] = data[key];
    }
  };

  const getModel = () => {
    return formatModel(model.value);
  };

  return {
    model,
    getInitialModel,
    resetModel,
    setModel,
    getModel,
  };
}

export type FormModel = ReturnType<typeof useFormModel>;

function formatModel(model: Recordable) {
  const data: Recordable = {};

  for (const [key, value] of Object.entries(model)) {
    if (/^\[.+\]$/.test(key)) {
      formatModelArray(key, value, data);
      continue;
    }
    if (/^\{.+\}$/.test(key)) {
      formatModelObject(key, value, data);
      continue;
    }
    data[key] = value;
  }

  return data;
}

function formatModelArray(key: string, value: any, data: Recordable) {
  let field = key.replaceAll(/\s/g, "");
  field = field.match(/^\[(.+)\]$/)?.[1] ?? "";

  if (!field) {
    data[key] = value;
    return;
  }

  const keys = field.split(",");
  keys.forEach((k, i) => {
    if (/(.+)?:number$/.test(k)) {
      k = k.replace(/:number$/, "");
      data[k] = value?.[i] && Number(value[i]);
      return;
    }
    if (/(.+)?:boolean$/.test(k)) {
      k = k.replace(/:boolean$/, "");
      data[k] = value?.[i] && Boolean(value[i]);
      return;
    }
    data[k] = value?.[i];
  });

  return data;
}

function formatModelObject(key: string, value: any, data: Recordable) {
  let field = key.replaceAll(/\s/g, "");
  field = field.match(/^\{(.+)\}$/)?.[1] ?? "";

  if (!field) {
    data[key] = value;
    return;
  }

  const keys = field.split(",");
  keys.forEach((k, i) => {
    if (/(.+)?:number$/.test(k)) {
      k = k.replace(/:number$/, "");
      data[k] = value?.[i] && Number(value[i]);
      return;
    }
    if (/(.+)?:boolean$/.test(k)) {
      k = k.replace(/:boolean$/, "");
      data[k] = value?.[i] && Boolean(value[i]);
      return;
    }
    data[k] = value?.[i];
  });

  return data;
}
