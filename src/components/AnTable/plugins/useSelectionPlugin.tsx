import { cloneDeep, defaultsDeep, merge } from 'lodash-es';
import { TableUseOptions } from '../hooks/useTable';
import { AnTablePlugin } from '../hooks/useTablePlugin';

// declare module '@/components/AnTable/hooks/useTable' {
//   interface TableUseOptions {
//     todo?: string;
//   }
// }

const defaults: TableUseOptions = {
  tableProps: {
    rowSelection: {
      showCheckedAll: true,
    },
  },
};

export function useSelection<T extends any>({ key = 'id', mode = 'key' } = {}): AnTablePlugin {
  const selected = ref<T[]>([]);

  return {
    id: 'selection',
    provide: {
      selected,
    },
    options(options) {
      const opts: TableUseOptions = defaultsDeep({}, defaults);

      if (!opts.tableProps!.rowKey) {
        opts.tableProps!.rowKey = key;
      }

      if (mode === 'key') {
        opts.tableProps!.onSelectionChange = rowkeys => {
          selected.value = rowkeys as any[];
        };
      }

      if (mode === 'row') {
        opts.tableProps!.onSelect = (rowkeys, rowkey, record) => {
          const index = selected.value.findIndex((i: any) => i[key] == record[key]);
          if (index > -1) {
            selected.value.splice(index, 1);
          }
        };
        opts.tableProps!.onSelectAll = checked => {
          if (checked) {
            selected.value = cloneDeep([]);
          } else {
            selected.value = [];
          }
        };
      }

      return merge(options, opts);
    },
  };
}
