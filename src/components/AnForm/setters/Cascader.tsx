import { Cascader, CascaderInstance } from '@arco-design/web-vue';
import { initOptions } from '../utils/initOptions';
import { defineSetter } from './util';

type CascaderProps = CascaderInstance['$props'];

type CascaderSlots = 'label' | 'prefix' | 'arrowIcon' | 'loadingIcon' | 'searchIcon' | 'empty' | 'option';

export default defineSetter<CascaderProps, CascaderSlots>({
  setter: Cascader,
  setterProps: {
    placeholder: '请选择',
    allowClear: true,
    expandTrigger: 'hover',
  },
  onSetup: initOptions as any,
});
