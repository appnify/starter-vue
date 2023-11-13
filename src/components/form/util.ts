import { cloneDeep } from "lodash-es";

/**
 * 获取表单数据
 */
export function getModel(model: any) {
  const data: Record<string, any> = {};
  for (const key of Object.keys(model)) {
    if (/[^:]+:[^:]+/.test(key)) {
      const keys = key.split(":");
      const vals = cloneDeep(model[key] || []);
      for (const k of keys) {
        data[k] = vals.shift();
      }
    } else {
      data[key] = cloneDeep(model[key]);
    }
  }
  return data;
}

/**
 * 设置表单数据
 */
export function setModel(model: any, data: Record<string, any>) {
  for (const key of Object.keys(model)) {
    if (/[^:]+:[^:]+/.test(key)) {
      const subKeys = key.split(":");
      model[key] = subKeys.map((k) => data[k]);
    } else {
      model[key] = data[key];
    }
  }
}