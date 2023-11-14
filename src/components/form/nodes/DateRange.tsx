import { RangePicker, RangePickerInstance } from "@arco-design/web-vue";

type Props = RangePickerInstance["$props"];

export default {
  render: RangePicker,
  nodeProps: {
    allowClear: true,
  } as Props,
};
