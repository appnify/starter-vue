import { InputInstance, InputSearch, InputSearchInstance } from '@arco-design/web-vue';
import { defineSetter } from './util';

type SearchProps = InputInstance['$props'] & InputSearchInstance['$props'];

type SearchSlots = "none";

export default defineSetter<SearchProps, SearchSlots>({
  setter: InputSearch,
  setterProps: {
    placeholder: '请输入',
    allowClear: true,
  },
});
