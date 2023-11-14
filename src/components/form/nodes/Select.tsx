import { Select, SelectInstance, SelectOptionData } from "@arco-design/web-vue";
import { initOptions } from "../form-config";
import { Component } from "vue";
import { defineSetter } from "../utils/defineSetter";

interface Interface {
  init: any;
  render: Component;
  nodeProps: SelectInstance["$props"];
  /**
   * 选项
   */
  options?: SelectOptionData[] | ((arg: any) => Recordable[] | Promise<Recordable[]>);
}

const select: Interface = {
  render: Select,
  init: initOptions,
  nodeProps: {
    placeholder: "请选择",
    allowClear: true,
    allowSearch: true,
    options: [],
  },
  options: [],
};

export default select;

// export default defineSetter({
//   setter: Select,
//   setterProps: {
//     placeholder: "请选择",
//     allowClear: true,
//     allowSearch: true,
//     options: [],
//   },
// });
