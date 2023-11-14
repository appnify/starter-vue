import setterMap from "../setters";

export type SetterMap = typeof setterMap;

export type SetterType = keyof SetterMap;

export type SetterItem = {
  [key in SetterType]: Partial<
    Omit<SetterMap[key], "setter"> & {
      /**
       * 组件类型
       */
      setter: key;
    }
  >;
}[SetterType];

export { setterMap };