import { Select, SelectInstance } from '@arco-design/web-vue';
import { initOptions } from '../utils/initOptions';
import { defineSetter } from './util';

type SelectProps = SelectInstance['$props'];

type SelectSlots = "6";

export default defineSetter<SelectProps, SelectSlots>({
  setter: Select,
  onSetup: initOptions as any,
  setterProps: {
    placeholder: '请选择',
    allowClear: true,
    allowSearch: true,
    options: [],
  },
});
