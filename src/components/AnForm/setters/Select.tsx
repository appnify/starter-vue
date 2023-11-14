import { Select, SelectInstance, SelectOptionData } from "@arco-design/web-vue";
import { initOptions } from "../utils/initOptions";

export default {
  render: Select,
  init: initOptions,
  nodeProps: {
    placeholder: "请选择",
    allowClear: true,
    allowSearch: true,
    options: [],
  } as SelectInstance["$props"],
  options: [] as SelectOptionData[] | ((arg: any) => Recordable[] | Promise<Recordable[]>) | undefined,
};
