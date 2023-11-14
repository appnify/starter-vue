import { InputInstance, Textarea, TextareaInstance } from "@arco-design/web-vue";

type Props = InputInstance["$props"] & TextareaInstance["$props"];

export default {
  render: Textarea,
  nodeProps: {
    placeholder: "请输入",
    allowClear: true,
  } as Props,
};
