import { DatePicker, DatePickerInstance } from "@arco-design/web-vue";

type Props = DatePickerInstance["$props"];

export default {
  render: DatePicker,
  nodeProps: {
    placeholder: "请选择",
    allowClear: true,
  } as Props,
};
