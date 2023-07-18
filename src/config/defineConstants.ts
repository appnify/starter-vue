
type MergeIntersection<A> = A extends infer T ? { [Key in keyof T]: T[Key] } : never;

interface Item {
  label: string;
  value: any;
  enumKey: string;
  [key: string]: any;
}

type ConstantType<T extends readonly Item[]> = MergeIntersection<
  {
    /**
     * 枚举值
     */
    [K in T[number]as K["enumKey"]]: K["value"];
  } & {
    /**
     * 格式化
     * @param value value值
     * @param key 指定返回的属性，默认为label
     */
    format<K extends T[number]["value"]>(value: K, key?: keyof T[number]): any;
    /**
     * 所有值组成的数组
     */
    values: any[];
    /**
     * 返回数组，由指定属性的值组成
     */
    prop<K extends keyof T[number]>(key: K): T[number][K][];
    /**
     * 获取指定值的项
     */
    pick(...values: T[number]["value"][]): Item[];
    /**
     * 排除指定值的项
     */
    omit(...values: T[number]["value"][]): Item[];
    /**
     * 原始项数组
     */
    raw: T;
    /**
     * 字典项映射
     */
    map: {
      [k in T[number]as k["value"]]: k;
    };
  }
>;

/**
 * 提供公共方法
 */
class Constanter {
  raw: Item[] = [];
  pick(...values: any[]) {
    return this.raw.filter((item) => values.includes(item.value));
  }
  omit(...values: any[]) {
    return this.raw.filter((item) => !values.includes(item.value));
  }
  each(key: string) {
    return this.raw.map((item) => item[key]);
  }
  format(value: any, key: string = "label") {
    return this.raw.find((item) => item.value === value)?.[key];
  }
}

/**
 * 定义字典常量
 */
export function defineConstants<T extends readonly Item[]>(items: T): ConstantType<T> {
  const constants: any = {
    items,
    map: {},
    values: [],
  };
  for (const item of items) {
    constants[item.enumKey] = item.value;
    constants.map[item.value] = item;
    constants.values.push(item.value);
  }
  return Object.setPrototypeOf(constants, Constanter.prototype);
}

// const media = defineConstants([
//   {
//     label: "视频",
//     value: 1,
//     enumKey: "VIDEO",
//   },
//   {
//     label: "图片",
//     value: 2,
//     enumKey: "IMAGE",
//   },
//   {
//     label: "文本",
//     value: 3,
//     enumKey: "TEXT",
//   },
// ] as const);

// console.log("media", media, media.VIDEO, media.IMAGE, media.TEXT);
// console.log("media pick", media.pick(media.VIDEO));
// console.log("media omit", media.omit(media.TEXT));
// console.log("media each", media.prop("label"));
// console.log("media format", media.format(2));
// console.log("media maps", media.map);
