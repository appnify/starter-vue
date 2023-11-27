import { Ref } from 'vue';
import { AnTableContext, ArcoTableProps } from '../components/Table';
import { AnTablePlugin } from '../hooks/useTablePlugin';
import { useTableSelect } from './useTableSelect';
import { delConfirm, delOptions, sleep } from '@/utils';
import { Button, Message, TableInstance } from '@arco-design/web-vue';

interface UseTableDeleteOptions {
  confirm?: string;
  onDelete?: (keys: (string | number)[]) => any | Promise<any>;
}

export function useTableDelete(options: UseTableDeleteOptions = {}): AnTablePlugin {
  let selected: Ref<any[]>;
  let context: AnTableContext;
  let tableProps: ArcoTableProps;
  const { confirm, onDelete } = options;

  return {
    id: 'deletemany',
    onSetup(ctx) {
      context = ctx;
      tableProps = ctx.props.tableProps!;
    },
    options(options) {
      let selectPlugin = options.plugins?.find(i => i.id === 'selection');
      if (!selectPlugin) {
        selectPlugin = useTableSelect();
        options.plugins!.push(selectPlugin);
      }
      selected = selectPlugin.provide!.selectedKeys;
      return options;
    },
    onLoaded() {
      console.log('loaded');
      selected.value = [];
    },
    action() {
      const onClick = async (props: any) => {
        delConfirm({
          ...delOptions,
          content: confirm ?? '危险操作，确定删除所选数据吗?',
          async onBeforeOk() {
            await sleep(3000);
            try {
              const res: any = await onDelete?.(props);
              const msg = res?.data?.message;
              msg && Message.success(`提示: ${msg}`);
              if (tableProps) {
                (tableProps as any).selectedKeys = [];
              }
              selected.value = [];
              context.refresh();
              return true;
            } catch (e) {
              console.log('删除失败：', e);
            }
            return false;
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
