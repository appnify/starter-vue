import { TreeSelect, TreeSelectInstance } from "@arco-design/web-vue";
import { initOptions } from "../form-config";

type Props = TreeSelectInstance["$props"];

export default {
  render: TreeSelect,
  init: (arg: any) => initOptions(arg, "data"),
  nodeProps: {
    placeholder: "请选择",
    allowClear: true,
    allowSearch: true,
    options: [],
  } as Props,
};
