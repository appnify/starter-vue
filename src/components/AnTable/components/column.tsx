import { dayjs } from '@/libs/dayjs';
import { TableColumn } from '../hooks/useTableColumn';

export function useUpdateColumn(extra: TableColumn = {}): TableColumn {
  return {
    title: '更新',
    dataIndex: 'createdAt',
    width: 180,
    render: ({ record }) => (
      <div class="flex flex-col overflow-hidden">
        <span>{record.updatedBy ?? '无'}</span>
        <span class="text-gray-400 text-xs truncate" title={record.updatedAt}>
          更新于 {dayjs(record.updatedAt).fromNow()}
        </span>
      </div>
    ),
    ...extra,
  };
}

export function useCreateColumn(extra: TableColumn = {}): TableColumn {
  return {
    title: '作者',
    dataIndex: 'createdAt',
    width: 180,
    render: ({ record }) => (
      <div class="flex flex-col overflow-hidden">
        <span>{record.createdBy ?? '无'}</span>
        <span class="text-gray-400 text-xs truncate" title={record.createdAt}>
          创建于 {dayjs(record.createdAt).fromNow()}
        </span>
      </div>
    ),
    ...extra,
  };
}
