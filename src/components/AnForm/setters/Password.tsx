import { InputInstance, InputPassword, InputPasswordInstance } from '@arco-design/web-vue';
import { defineSetter } from './util';

type PasswordProps = InputInstance['$props'] & InputPasswordInstance['$props'];

type PasswordSlots = 'none';

export default defineSetter<PasswordProps, PasswordSlots>({
  setter: InputPassword,
  setterProps: {
    placeholder: '请输入',
  },
});
