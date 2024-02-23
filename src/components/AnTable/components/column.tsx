import { dayjs } from '@/libs/dayjs';
import { TableColumn } from '../hooks/useTableColumn';
import { Avatar } from '@arco-design/web-vue';

export function useUpdateColumn(extra: TableColumn = {}): TableColumn {
  return {
    title: '修改',
    dataIndex: 'createdAt',
    width: 180,
    render: ({ record }) => (
      <div class="flex items-center gap-2 overflow-hidden">
        <span>
          <Avatar size={24}>{record.updatedBy?.[0] ?? '无'}</Avatar>
        </span>
        <span class="ttruncate" title={record.updatedAt}>
          {dayjs(record.updatedAt).fromNow()}
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
      <div class="flex items-center gap-2 overflow-hidden">
        <span>
          <Avatar size={24}>{record.createdBy?.[0] ?? '无'}</Avatar>
        </span>
        <span class="text-gray-400 text-xs truncate" title={record.createdAt}>
          {dayjs(record.createdAt).fromNow()}
        </span>
      </div>
    ),
    ...extra,
  };
}
