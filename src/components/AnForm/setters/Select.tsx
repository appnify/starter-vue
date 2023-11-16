import { Select, SelectInstance } from '@arco-design/web-vue';
import { initOptions } from '../utils/initOptions';
import { defineSetter } from './util';

type SelectProps = SelectInstance['$props'];

type SelectSlots =
  | 'trigger'
  | 'prefix'
  | 'searchIcon'
  | 'loadingIcon'
  | 'arrowIcon'
  | 'footer'
  | 'header'
  | 'label'
  | 'option'
  | 'empty';

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
