import { Input, InputInstance } from '@arco-design/web-vue';
import { defineSetter } from './util';

type InputProps = InputInstance['$props'];

type InputSlots = 'prepend' | 'append' | 'suffix' | 'prefix';

export default defineSetter<InputProps, InputSlots>({
  setter: Input,
  setterProps: {
    placeholder: '请输入',
    allowClear: true,
  },
});
