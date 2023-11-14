import { TimePicker, TimePickerInstance } from "@arco-design/web-vue";

type Props = TimePickerInstance["$props"];

export default {
  render: TimePicker,
  nodeProps: {
    allowClear: true,
  } as Props,
};
