type MergeIntersection<A> = A extends infer T ? { [Key in keyof T]: T[Key] } : never;

interface Item {
  label: string;
  value: any;
  [key: string]: any;
}

interface ProtoInterface<T extends readonly Item[]> {
  /**
   * 格式化
   * @param value 值
   * @param key 属性名，默认为 `label`
   */
  fmt<K extends T[number]["value"]>(value: K, key?: keyof T[number]): any;

  /**
   * 返回数组，由指定属性的值组成
   * @description 默认返回 value 属性值组成的数组
   */
  val<K extends keyof T[number]>(key: K): T[number][K][];

  /**
   * 原始项数组
   */
  raw(): T;

  /**
   * 字典项映射
   */
  map(): {
    [k in T[number] as k["value"]]: k;
  };
}

class Proto implements ProtoInterface<Item[]> {
  _raw: Item[] = [];

  fmt(value: any, key = "label") {
    return this._raw.find((item) => item.value === value)?.[key];
  }

  val(key: any = "value") {
    return this._raw.map((item) => item[key]);
  }

  raw() {
    return this._raw;
  }

  map() {
    return this._raw.reduce((acc, cur) => {
      acc[cur.value] = cur;
      return acc;
    }, {} as any);
  }
}

type EnumType<T extends Object, R extends readonly Item[]> = MergeIntersection<T & ProtoInterface<R>>;

/**
 * 扩展枚举对象，添加额外的方法
 * @param target 枚举对象
 * @param items 对象数组
 * @returns
 */
export function extendEnum<T extends Object, I extends readonly Item[]>(target: T, items: I): EnumType<T, I> {
  Object.assign(target, { _raw: items });
  Object.setPrototypeOf(target, Proto.prototype);
  return target as any;
}
