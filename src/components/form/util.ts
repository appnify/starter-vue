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

/**
 * 字符串或函数渲染
 * @param value 值
 * @param arg 参数
 * @returns
 */
export function strOrFnRender(value?: string | Function, arg?: any) {
  if (typeof value === "string") {
    return () => value;
  }
  if (typeof value === "function") {
    return () => value(arg);
  }
  return null;
}

export const falsy = () => false;
