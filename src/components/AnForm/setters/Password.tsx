import { InputInstance, InputPassword, InputPasswordInstance } from "@arco-design/web-vue";

type Props = InputInstance["$props"] & InputPasswordInstance["$props"];

export default {
  render: InputPassword,
  nodeProps: {
    placeholder: "请输入",
  } as Props,
};
