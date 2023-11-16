import { InputInstance, InputNumber, InputNumberInstance } from '@arco-design/web-vue';
import { defineSetter } from './util';

type NumberProps = InputInstance['$props'] | InputNumberInstance['$props'];

type NumberSlots = 'minus' | 'plus' | 'append' | 'prepend' | 'suffix' | 'prefix';

export default defineSetter<NumberProps, NumberSlots>({
  setter: InputNumber,
  setterProps: {
    placeholder: '请输入',
    defaultValue: 0,
    allowClear: true,
  },
});
