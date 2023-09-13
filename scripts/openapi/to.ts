import { useTable } from '@/components/table';
import { api } from '/api';

const table = useTable({
  data: async (data, paging) => {
    return api.user.getUsers({ ...data, ...paging });
  },
  columns: [
    {
      title: '用户名',
      dataIndex: 'username',
    },
  ],
  search: {
    items: [
      {
        field: 'username',
        label: '用户名',
        type: 'input',
      },
    ]
  },
  create: {
    title: '新增用户',
    items: [
      {
        field: 'username',
        label: '用户名',
        type: 'input',
      },
    ],
    submit: async (data) => {
      return api.user.addUser(data);
    }
  },
  modify: {
    title: '修改用户',
    items: [
      {
        field: 'username',
        label: '用户名',
        type: 'input',
      },
    ],
    submit: async (data) => {
      return api.user.setUser(data);
    }
  }
})