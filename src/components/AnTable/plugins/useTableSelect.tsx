import { cloneDeep, defaultsDeep, merge } from 'lodash-es';
import { TableUseOptions } from '../hooks/useTable';
import { AnTablePlugin } from '../hooks/useTablePlugin';
import { AnTableContext, ArcoTableProps } from '../components/Table';

const defaults: TableUseOptions = {
  tableProps: {
    rowSelection: {
      showCheckedAll: true,
    },
  },
};

interface UseTableSelectOptions {
  key?: string;
  mode?: 'key' | 'row' | 'both';
}

/**
 * 插件：表格多选
 * @description 请配合其他插件使用
 */
export function useTableSelect({ key = 'id', mode = 'key' }: UseTableSelectOptions = {}): AnTablePlugin {
  let context: AnTableContext;
  const selectedKeys = ref<(string | number)[]>([]);
  const selectedRows = ref<any[]>([]);
  const setKeys = (keys: any[]) => {
    const tableProps = context.props.tableProps;
    if (tableProps) {
      (tableProps as any).selectedKeys = keys;
    }
  };

  return {
    id: 'selection',
    provide: {
      selectedKeys,
      selectedRows,
    },
    onSetup(ctx) {
      context = ctx;
    },
    options(options) {
      const opts: TableUseOptions = defaultsDeep({}, defaults);

      if (!opts.tableProps!.rowKey) {
        opts.tableProps!.rowKey = key;
      }

      if (mode === 'both' || mode === 'key') {
        opts.tableProps!.onSelectionChange = rowkeys => {
          selectedKeys.value = rowkeys;
          setKeys(rowkeys);
          console.log(rowkeys);
        };
      }

      if (mode === 'both' || mode === 'row') {
        opts.tableProps!.onSelect = (rowkeys, rowkey, record) => {
          const index = selectedRows.value.findIndex((i: any) => i[key] == record[key]);
          if (index > -1) {
            selectedRows.value.splice(index, 1);
          }
          setKeys(selectedRows.value.map(i => i.id));
        };
        opts.tableProps!.onSelectAll = checked => {
          if (checked) {
            selectedRows.value = cloneDeep([]);
          } else {
            selectedRows.value = [];
          }
          setKeys(selectedRows.value.map(i => i.id));
        };
      }

      return merge(options, opts);
    },
    onLoaded() {
      setKeys([]);
    },
  };
}
