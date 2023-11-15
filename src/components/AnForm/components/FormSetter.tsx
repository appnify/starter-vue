import setterMap from '../setters';

export type SetterMap = typeof setterMap;

export type SetterType = keyof SetterMap;

export type SetterItemMap = {
  [key in SetterType]: {
    /**
     * 控件类型
     * @example
     * ```ts
     * 'input'
     * ```
     */
    setter?: key;
    /**
     * 控件参数
     * @example 
     * ```tsx
     * { type: "password" }
     * ```
     */
    setterProps?: SetterMap[key]['setterProps'];
    /**
     * 控件插槽
     * @example
     * ```tsx
     * {
     *   help: (props) => {
     *     return <span>
     *       {props.item.label}
     *     </span>
     *   }
     * }
     * ```
     */
    setterSlots?: SetterMap[key]['setterSlots'];
  };
};

export type SetterItem = SetterItemMap[SetterType];

export { setterMap };

