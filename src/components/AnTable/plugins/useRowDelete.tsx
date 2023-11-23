import { delConfirm, delOptions } from '@/utils';
import { AnTableContext } from '../components/Table';
import { AnTablePlugin } from '../hooks/useTablePlugin';
import { Message } from '@arco-design/web-vue';
import { defaultsDeep } from 'lodash-es';

export function useRowDelete(): AnTablePlugin {
  let ctx: AnTableContext;
  return {
    id: 'rowDelete',
    onSetup(context) {
      ctx = context;
    },
    options(options) {
      for (const column of options.columns ?? []) {
        if (column.type !== 'button') {
          continue;
        }
        const btn = column.buttons.find(i => i.type === 'delete');
        if (!btn) {
          continue;
        }
        defaultsDeep(btn, {
          buttonProps: {
            status: 'danger',
          },
        });
        const onClick = btn.onClick;
        btn.onClick = async props => {
          let confirm = btn.confirm ?? {};
          if (typeof confirm === 'string') {
            confirm = { content: confirm };
          }
          delConfirm({
            ...delOptions,
            ...confirm,
            async onBeforeOk() {
              const res: any = await onClick?.(props);
              const msg = res?.data?.message;
              msg && Message.success(`提示: ${msg}`);
              ctx.refresh();
            },
          });
        };
      }
    },
  };
}
