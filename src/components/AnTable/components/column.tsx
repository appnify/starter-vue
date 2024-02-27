import { dayjs } from '@/libs/dayjs';
import { Avatar } from '@arco-design/web-vue';
import { TableColumn } from '../hooks/useTableColumn';

export function useUpdateColumn(extra: TableColumn = {}): TableColumn {
  return {
    title: '最近修改',
    dataIndex: 'createdAt',
    width: 180,
    render: ({ record }) => (
      <div class="flex items-center gap-2 overflow-hidden">
        <span>
          <Avatar size={22}>{record.updatedBy?.substr(0,1) ?? '无'}</Avatar>
        </span>
        <span class="truncate" title={record.updatedAt}>
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
      <div class="flex direction-col items-center gap-2 overflow-hidden">
        <span>
          {record.createdBy ?? '无'}
        </span>
        <span class="text-gray-400 text-xs truncate" title={record.createdAt}>
          {dayjs(record.createdAt).fromNow()}
        </span>
      </div>
    ),
    ...extra,
  };
}
