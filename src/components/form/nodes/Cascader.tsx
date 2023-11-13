import { Cascader, CascaderInstance } from "@arco-design/web-vue";
import { initOptions } from "../form-config";

type Props = CascaderInstance["$props"];

export default {
  render: Cascader,
  init: initOptions,
  nodeProps: {
    placeholder: "请选择",
    allowClear: true,
    expandTrigger: "hover",
  } as Props,
};
