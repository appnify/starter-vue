interface Item {
  label: string;
  value: any;
  [key: string]: any;
}

class Constant<T extends Item[]> {
  constructor(public raw: T) {}

  /**
   * 格式化值
   */
  fmt<K extends T[number]['value']>(value: K, key?: keyof T[number]) {
    return this.raw.find(item => item.value === value)?.[key ?? ('label' as any)];
  }

  /**
   * 获取对应属性值组成的数组
   */
  val<K extends keyof T[number]>(key?: K) {
    return this.raw.map(item => item[key ?? ('value' as any)]);
  }

  /**
   * 获取值对应的对象
   */
  get(value: any) {
    return this.raw.find(item => item.value === value);
  }
}

const defineConstants = <T extends Item[]>(items: T) => {
  return new Constant(items);
};

export { defineConstants };
