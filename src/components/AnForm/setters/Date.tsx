import { DatePicker, DatePickerInstance } from '@arco-design/web-vue';
import { defineSetter } from './util';
import { PickerProps } from '@arco-design/web-vue/es/date-picker/interface';

type DateProps = DatePickerInstance['$props'] & Partial<PickerProps>;

type DateSlots =
  | 'prefix'
  | 'suffixIcon'
  | 'iconNextDouble'
  | 'iconPrevDouble'
  | 'iconNext'
  | 'iconPrev'
  | 'cell'
  | 'extra';

export default defineSetter<DateProps, DateSlots>({
  setter: DatePicker,
  setterProps: {
    placeholder: '请选择',
    allowClear: true,
  },
});
