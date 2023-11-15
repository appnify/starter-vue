import { cloneDeep } from 'lodash-es';
import { Ref } from 'vue';

/**
 * 表单数据管理
 * @param initial 初始值
 * @returns
 */
export function useFormModel(model: Ref<Recordable>, clearValidate: any) {
  const initial = cloneDeep(model.value);

  const resetModel = () => {
    model.value = cloneDeep(initial);
    clearValidate();
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

export function formatModel(model: Recordable) {
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
  let field = key.replaceAll(/\s/g, '');
  field = field.match(/^\[(.+)\]$/)?.[1] ?? '';

  if (!field) {
    data[key] = value;
    return;
  }

  field.split(',').forEach((key, index) => {
    data[key] = value?.[index];
  });

  return data;
}

function formatModelObject(key: string, value: any, data: Recordable) {
  let field = key.replaceAll(/\s/g, '');
  field = field.match(/^\{(.+)\}$/)?.[1] ?? '';

  if (!field) {
    data[key] = value;
    return;
  }

  for (const key of field.split(',')) {
    data[key] = value?.[key];
  }

  return data;
}
