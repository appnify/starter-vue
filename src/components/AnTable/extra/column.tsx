import { dayjs } from '@/libs/dayjs';
import { TableColumn } from '../hooks/useTableColumn';

export function useUpdateColumn(): TableColumn {
  return {
    title: '更新用户',
    dataIndex: 'createdAt',
    width: 190,
    render({ record }) {
      return (
        <div class="flex flex-col overflow-hidden">
          <span>{record.updatedBy ?? '无'}</span>
          <span class="text-gray-400 text-xs truncate">{dayjs(record.updatedAt).format()}</span>
        </div>
      );
    },
  };
}

export function useCreateColumn(): TableColumn {
  return {
    title: '创建用户',
    dataIndex: 'createdAt',
    width: 190,
    render({ record }) {
      return (
        <div class="flex flex-col overflow-hidden">
          <span>{record.createdBy ?? '无'}</span>
          <span class="text-gray-400 text-xs truncate">{dayjs(record.createdAt).format()}</span>
        </div>
      );
    },
  };
}
