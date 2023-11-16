import { TreeSelect, TreeSelectInstance } from '@arco-design/web-vue';
import { initOptions } from '../utils/initOptions';
import { defineSetter } from './util';

type TreeSelectProps = TreeSelectInstance['$props'];

type TreeSelectSlots =
  | 'trigger'
  | 'prefix'
  | 'label'
  | 'header'
  | 'loader'
  | 'empty'
  | 'footer'
  | 'treeSlotExtra'
  | 'treeSlotTitle'
  | 'treeSlotIcon'
  | 'treeSlotSwitcherIcon';

export default defineSetter<TreeSelectProps, TreeSelectSlots>({
  setter: TreeSelect,
  onSetup: (arg: any) => initOptions(arg, 'data') as any,
  setterProps: {
    placeholder: '请选择',
    allowClear: true,
    allowSearch: true,
  },
});
