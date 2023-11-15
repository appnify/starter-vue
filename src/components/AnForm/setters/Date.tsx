import { DatePicker, DatePickerInstance } from '@arco-design/web-vue';
import { defineSetter } from './util';

type DateProps = DatePickerInstance['$props'];

type DateSlots = 'prefix' | 'suffixIcon' | 'iconNextDouble' | 'iconPrevDouble' | 'iconNext' | 'iconPrev' | 'cell' | 'extra';

export default defineSetter<DateProps, DateSlots>({
  setter: DatePicker,
  setterProps: {
    placeholder: '请选择',
    allowClear: true,
  } as any,
});
