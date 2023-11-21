import { AnTableContext } from '../components/Table';
import { AnTablePlugin } from '../hooks/useTablePlugin';

export function useRowModify(): AnTablePlugin {
  let ctx: AnTableContext;
  return {
    id: 'rowModify',
    onSetup(context) {
      ctx = context;
    },
    options(options) {
      for (const column of options.columns ?? []) {
        if (column.type !== 'button') {
          continue;
        }
        const btn = column.buttons.find(i => i.type === 'modify');
        if (!btn) {
          continue;
        }
        const onClick = btn.onClick;
        btn.onClick = async props => {
          const { modifyRef } = ctx ?? {};
          modifyRef?.value?.open(props.record);
        };
      }
    },
  };
}
