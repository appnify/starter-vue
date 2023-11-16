import { RangePicker, RangePickerInstance } from '@arco-design/web-vue';
import { defineSetter } from './util';

type RangeProps = RangePickerInstance['$props'];

type RangeSlots = "none";

export default defineSetter<RangeProps, RangeSlots>({
  setter: RangePicker,
  setterProps: {
    allowClear: true,
  },
});
