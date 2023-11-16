import { TimePicker, TimePickerInstance } from '@arco-design/web-vue';
import { defineSetter } from './util';

type TimeProps = TimePickerInstance['$props'];

type TimeSlots = 'prefix' | 'suffixIcon' | 'extra';

export default defineSetter<TimeProps, TimeSlots>({
  setter: TimePicker,
  setterProps: {
    allowClear: true,
  },
});
