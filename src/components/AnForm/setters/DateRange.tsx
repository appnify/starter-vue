import { RangePicker, RangePickerInstance } from '@arco-design/web-vue';
import { defineSetter } from './util';

type RangeProps = RangePickerInstance['$props'];

type RangeSlots = "1";

export default defineSetter<RangeProps, RangeSlots>({
  setter: RangePicker,
  setterProps: {
    allowClear: true,
  },
});
