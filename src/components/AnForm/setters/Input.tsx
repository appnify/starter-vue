import { Input, InputInstance } from "@arco-design/web-vue";

type Props = InputInstance["$props"];

export default {
  render: Input,
  nodeProps: {
    placeholder: "请输入",
    allowClear: true,
  } as Props,
};
