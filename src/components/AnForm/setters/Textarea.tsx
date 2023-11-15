import { InputInstance, Textarea, TextareaInstance } from '@arco-design/web-vue';
import { defineSetter } from './util';

type TextareaProps = InputInstance['$props'] & TextareaInstance['$props'];

type TextareaSlots = "7";

export default defineSetter<TextareaProps, TextareaSlots>({
  setter: Textarea,
  setterProps: {
    placeholder: '请输入',
    allowClear: true,
  },
});
