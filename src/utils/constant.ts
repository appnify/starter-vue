interface Item {
  label: string;
  value: any;
  [key: string]: any;
}

class Constant<T extends Item[]> {
  constructor(public raw: T) {}

  /**
   * 格式化枚举值
   * @param value 值
   * @param key 属性名，默认为label
   * @returns
   */
  fmt<K extends T[number]["value"]>(value: K, key?: keyof T[number]) {
    return this.raw.find((item) => item.value === value)?.[key ?? ("label" as any)];
  }

  /**
   * 获取对应属性值组成的数组
   * @param key 属性名，默认为value
   * @returns
   */
  val<K extends keyof T[number]>(key?: K) {
    return this.raw.map((item) => item[key ?? ("value" as any)]);
  }

  /**
   * 获取枚举值对应的对象
   * @param value 枚举值
   * @returns
   */
  get(value: any) {
    return this.raw.find((item) => item.value === value);
  }

  /**
   * 创建实例
   * @param items 对象数组
   * @returns
   */
  static from<T extends Item[]>(items: T) {
    return new Constant(items);
  }
}

export { Constant };

