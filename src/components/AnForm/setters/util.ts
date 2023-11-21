import { Component } from 'vue';
import { AnFormItemPropsBase, AnFormItemSlot, AnFormItemFnProps } from '../components/FormItem';

export interface ItemSetter<P extends object, S extends string> {
  /**
   * 输入组件
   */
  setter: Component;

  /**
   * 输入组件参数
   */
  setterProps?: P;

  /**
   * 空间插槽
   */
  setterSlots?: {
    /**
     * 控件插槽
     * @example
     * ```tsx
     * (props) => {
     *   return <span>{props.item.label}</span>
     * }
     * ```
     */
    [key in S]?: AnFormItemSlot;
  };

  /**
   * 初始化钩子
   */
  onSetup?: (args: { model: Recordable; item: AnFormItemPropsBase; items: AnFormItemPropsBase[] }) => void;
}

export function defineSetter<P extends object, S extends string>(setter: ItemSetter<P, S>) {
  return setter;
}

export function initOptions({ item, model }: AnFormItemFnProps, key: string = 'options') {
  const setterProps: Recordable = item.setterProps!;
  if (Array.isArray(item.options) && item.setterProps) {
    setterProps[key] = item.options;
    return;
  }
  if (typeof item.options === 'function') {
    setterProps[key] = reactive([]);
    item.$init = async () => {
      const res = await (item as any).options({ item, model });
      if (Array.isArray(res)) {
        setterProps[key].splice(0);
        setterProps[key].push(...res);
        return;
      }
      const data = res?.data?.data;
      if (Array.isArray(data)) {
        const maped = data.map((i: any) => ({ ...i, value: i.id, label: i.name }));
        setterProps[key].splice(0);
        setterProps[key].push(...maped);
        return;
      }
    };
    item.$init();
  }
}
