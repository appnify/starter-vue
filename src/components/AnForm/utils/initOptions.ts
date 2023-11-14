export function initOptions({ item, model }: any, key = "options") {
  if (Array.isArray(item.options)) {
    item.nodeProps[key] = item.options;
    return;
  }
  if (item.options && typeof item.options === "object") {
    const { value, source } = item.options;
    item._updateOptions = async () => {};
    return;
  }
  if (typeof item.options === "function") {
    const loadData = item.options;
    item.nodeProps[key] = reactive([]);
    item._updateOptions = async () => {
      let data = await loadData({ item, model });
      if (Array.isArray(data?.data?.data)) {
        data = data.data.data.map((i: any) => ({
          ...i,
          label: i.name,
          value: i.id,
        }));
      }
      if (Array.isArray(data)) {
        item.nodeProps[key].splice(0);
        item.nodeProps[key].push(...data);
      }
    };
    item._updateOptions();
  }
}
