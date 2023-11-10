import { cloneDeep } from "lodash-es";

function formatModel(model: Recordable) {
  const data: Recordable = {};
  for (const [key, val] of Object.entries(model)) {
    // 数组类型
    if (/^\[.+\]$/.test(key)) {
      const subkeysStr = key.replaceAll(/\s/g, "").match(/^\[(.+)\]$/)?.[1];
      if (!subkeysStr) {
        data[key] = val;
        continue;
      }
      const subkeys = subkeysStr.split(",");
      subkeys.forEach((subkey, index) => {
        if (/(.+)?:number$/.test(subkey)) {
          subkey = subkey.replace(/:number$/, "");
          data[subkey] = val?.[index] && Number(val[index]);
          return;
        }
        if (/(.+)?:boolean$/.test(subkey)) {
          subkey = subkey.replace(/:boolean$/, "");
          data[subkey] = val?.[index] && Boolean(val[index]);
          return;
        }
        data[subkey] = val?.[index];
      });
      continue;
    }
    // 默认类型
    data[key] = val;
  }
  return data;
}

/**
 * 表单数据管理
 * @param initial 初始值
 * @returns
 */
export function useModel(initial: Recordable) {
  const model = ref<Recordable>({});

  const resetModel = () => {
    model.value = cloneDeep(initial);
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
    resetModel,
    setModel,
    getModel,
  };
}
