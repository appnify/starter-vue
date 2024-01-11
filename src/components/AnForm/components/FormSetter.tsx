import setterMap from '../setters';

/**
 * 键值对类型
 */
export type SetterMap = typeof setterMap;

/**
 * 组件名联合类型
 */
export type SetterType = keyof SetterMap;

/**
 * 重新映射
 */
export type SetterItemMap = {
  [key in SetterType]: {
    /**
     * 控件类型
     * @example
     * ```ts
     * 'input'
     * ```
     */
    setter: key;
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
     * label: (props) => <span>{props.item.label}</span>
     * ```
     */
    setterSlots?: SetterMap[key]['setterSlots'];
  };
};

/**
 * 控件类型
 */
export type SetterItem =
  | SetterItemMap[SetterType]
  | { setter?: undefined; setterProps?: undefined; setterSlots?: undefined };

export { setterMap };
