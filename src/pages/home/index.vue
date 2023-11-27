<template>
  <div class="m-4 bg-white p-4">
    <user-table></user-table>
  </div>
</template>

<script setup lang="tsx">
import { api } from '@/api';
import { useTable } from '@/components/AnTable';

const { component: UserTable } = useTable({
  columns: [
    {
      dataIndex: 'id',
      title: 'ID',
      configable: false,
    },
    {
      dataIndex: 'nickname',
      title: '用户名称',
    },
    {
      dataIndex: 'username',
      title: '登录账号',
    },
    {
      dataIndex: 'email',
      title: '邮箱',
    },
    {
      dataIndex: 'phone',
      title: '手机号码',
    },
    {
      dataIndex: 'createdBy',
      title: '创建人',
    },
    {
      dataIndex: 'createdAt',
      title: '创建时间',
    },
    {
      dataIndex: 'updatedBy',
      title: '更新人',
    },
    {
      dataIndex: 'updatedAt',
      title: '更新时间',
    },
    {
      title: '操作',
      type: 'button',
      width: 180,
      configable: false,
      buttons: [
        {
          type: 'modify',
          text: '修改',
        },
        {
          text: '移动',
          disable: () => true,
        },
        {
          type: 'delete',
          confirm: '确定删除吗？',
          text: '删除',
          onClick(props) {
            const id = props.record.id;
            return api.user.delUser(id);
          },
        },
      ],
    },
  ],
  source: search => {
    return [];
  },
  search: [
    {
      field: 'username',
      label: '用户名称',
      setter: 'input',
    },
  ],
  create: {
    title: '新增',
    width: 580,
    items: [
      {
        field: 'title',
        label: '标题',
        setter: 'input',
      },
      {
        field: 'title2',
        label: '标题',
        setter: 'input',
      },
      {
        field: 'title1',
        label: '标题',
        setter: 'input',
      },
    ],
    submit: model => {
      return 1;
    },
  },
  modify: {
    extend: true,
    title: '修改',
  },
});
</script>

<style scoped></style>

<route lang="json">
{
  "meta": {
    "sort": 10001,
    "title": "概览",
    "icon": "icon-park-outline-home"
  }
}
</route>
@/components/AnForm/components/useFormModel
