import { AnTablePlugin } from '../hooks/useTablePlugin';

export function useRowFormat(): AnTablePlugin {
  return {
    id: 'format',
    options(options) {
      for (const column of options.columns ?? []) {
        if (column.render) {
          continue;
        }
        column.render = ({ record, column }) => record[column.dataIndex!] ?? '-';
      }
    },
  };
}
