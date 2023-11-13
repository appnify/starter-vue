import { InputInstance, InputSearch, InputSearchInstance } from "@arco-design/web-vue";

type Props = InputInstance["$props"] & InputSearchInstance["$props"];

export default {
  render: InputSearch,
  nodeProps: {
    placeholder: "请输入",
    allowClear: true,
  } as Props,
};
