import { Ref } from 'vue';
import { AnTableContext } from '../components/Table';
import { AnTablePlugin } from '../hooks/useTablePlugin';
import { useTableSelect } from './useTableSelect';
import { delConfirm, delOptions, sleep } from '@/utils';
import { Button, Message } from '@arco-design/web-vue';

export function useTableDelete(): AnTablePlugin {
  let selected: Ref<any[]>;
  let context: AnTableContext;

  return {
    id: 'deletemany',
    options(options) {
      let selectPlugin = options.plugins?.find(i => i.id === 'selection');
      if (!selectPlugin) {
        selectPlugin = useTableSelect();
        options.plugins!.push(selectPlugin);
      }
      selected = selectPlugin.provide!.selectedKeys;
      return options;
    },
    action() {
      const onClick = async (props: any) => {
        delConfirm({
          ...delOptions,
          content: '危险操作，确定删除所选数据吗?',
          async onBeforeOk() {
            await sleep(3000);
            const res: any = await onClick?.(props);
            const msg = res?.data?.message;
            msg && Message.success(`提示: ${msg}`);
            selected.value = [];
            context.refresh();
          },
        });
      };
      return props => (
        <Button status="danger" disabled={!selected.value.length} onClick={() => onClick(props)}>
          {{
            icon: () => <i class="icon-park-outline-delete" />,
            default: () => '删除',
          }}
        </Button>
      );
    },
  };
}
