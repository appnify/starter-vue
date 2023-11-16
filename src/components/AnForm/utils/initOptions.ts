import { IAnFormItemFnProps } from '../components/FormItem';

export function initOptions({ item, model }: IAnFormItemFnProps, key: string = 'options') {
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
