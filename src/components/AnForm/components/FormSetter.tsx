import setterMap from '../setters';

export type SetterMap = typeof setterMap;

export type SetterType = keyof SetterMap;

export type SetterItem = {
  [key in SetterType]: Partial<
    Omit<SetterMap[key], 'setter'> & {
      /**
       * 控件类型
       * @example 'input'
       */
      setter: key;
      /**
       * 控件插槽
       */
      setterSlots: Recordable;
      /**
       * 控件参数
       */
      setterProps: Recordable;
    }
  >;
}[SetterType];

export { setterMap };
