import { TimePicker, TimePickerInstance } from '@arco-design/web-vue';
import { defineSetter } from './util';

type TimeProps = TimePickerInstance['$props'];

type TimeSlots = "8";

export default defineSetter<TimeProps, TimeSlots>({
  setter: TimePicker,
  setterProps: {
    allowClear: true,
  },
});
