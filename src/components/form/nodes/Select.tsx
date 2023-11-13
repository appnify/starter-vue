import { Select, SelectInstance } from "@arco-design/web-vue";
import { initOptions } from "../form-config";

type Props = SelectInstance["$props"];

export default {
  render: Select,
  init: initOptions,
  nodeProps: {
    placeholder: "请选择",
    allowClear: true,
    allowSearch: true,
    options: [],
  } as Props,
};
