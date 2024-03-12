interface Item {
  label: string;
  value: any;
  [key: string]: any;
}

/**
 * 常量工具类
 */
class Constant<T extends Item[]> {
  /**
   * 原始数据
   */
  raw: T;

  constructor(raw: T) {
    this.raw = raw;
  }

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

/**
 * 定义常量数组
 */
export const defineConstants = <T extends Item[]>(items: T) => {
  return new Constant(items);
};
