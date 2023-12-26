
export function getModel(model: Recordable) {
  const data: Recordable = {};

  for (const [key, value] of Object.entries(model)) {
    if (value === '') {
      continue;
    }
    if (/^\[.+\]$/.test(key)) {
      getModelArray(key, value, data);
      continue;
    }
    if (/^\{.+\}$/.test(key)) {
      getModelObject(key, value, data);
      continue;
    }
    data[key] = value;
  }

  return data;
}

export function setModel(model: Recordable, data: Recordable) {
  for (const [key, value] of Object.entries(model)) {
    if (/^\[.+\]$/.test(key)) {
      model[key] = setModelArray(data, key);
      continue;
    }
    if (/^\{.+\}$/.test(key)) {
      model[key] = setModelObject(data, key);
      continue;
    }
    model[key] = data[key];
  }
  console.log(model, data);
  return model;
}

function rmString(str: string) {
  const field = str.replaceAll(/\s/g, '');
  return field.match(/^(\{|\[)(.+)(\}|\])$/)?.[1] ?? '';
}

function setModelArray(data: Recordable, key: string) {
  const result = [];
  const field = rmString(key);
  for (const key of field.split(',')) {
    result.push(data[key]);
  }
  return result;
}

function setModelObject(data: Recordable, key: string) {
  const result: Recordable = {};
  const field = rmString(key);
  for (const key of field.split(',')) {
    result[key] = data[key];
  }
  return result;
}

function getModelArray(key: string, value: any, data: Recordable) {
  let field = rmString(key);

  if (!field) {
    data[key] = value;
    return;
  }

  field.split(',').forEach((key, index) => {
    data[key] = value?.[index];
  });

  return data;
}

function getModelObject(key: string, value: any, data: Recordable) {
  const field = rmString(key);

  if (!field) {
    data[key] = value;
    return;
  }

  for (const key of field.split(',')) {
    data[key] = value?.[key];
  }

  return data;
}
