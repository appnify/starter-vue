import { InputInstance, InputNumber, InputNumberInstance } from "@arco-design/web-vue";

type Props = InputInstance["$props"] & InputNumberInstance["$props"];

export default {
  render: InputNumber,
  nodeProps: {
    placeholder: "请输入",
    defaultValue: 0,
    allowClear: true,
  } as Props,
};
