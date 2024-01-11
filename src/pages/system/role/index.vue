<template>
  <BreadPage>
    <role-table></role-table>
  </BreadPage>
</template>

<script setup lang="tsx">
import { api } from '@/api';
import { useCreateColumn, useTable, useUpdateColumn } from '@/components/AnTable';

defineOptions({ name: 'SystemRolePage' });

const { component: RoleTable } = useTable({
  source: () => {
    return api.role.getRoles();
  },
  columns: [
    {
      title: '角色名称',
      dataIndex: 'username',
      render: ({ record }) => (
        <div class="flex flex-col overflow-hidden">
          <span>
            {record.name}
            <span class="text-gray-400 text-xs truncate ml-2">@{record.code}</span>
          </span>
          <div class="text-gray-400 text-xs truncate mt-0.5">{record.description}</div>
        </div>
      ),
    },
    useCreateColumn(),
    useUpdateColumn(),
    {
      title: '操作',
      type: 'button',
      width: 200,
      buttons: [
        {
          text: '分配权限',
          onClick: ({ record }) => {
            console.log(record);
          },
        },
        {
          type: 'modify',
          text: '修改',
        },
        {
          text: '删除',
          type: 'delete',
          onClick: ({ record }) => {
            return api.role.delRole(record.id);
          },
        },
      ],
    },
  ],
  search: [
    {
      field: 'name',
      label: '角色名称',
      setter: 'search',
    },
  ],
  create: {
    title: '新建角色',
    width: 580,
    items: [
      {
        field: 'name',
        label: '名称',
        setter: 'input',
        required: true,
      },
      {
        field: 'code',
        label: '标识',
        setter: 'input',
        required: true,
      },
      {
        field: 'description',
        label: '个人描述',
        setter: 'textarea',
      },
    ],
    submit: model => {
      return api.role.addRole(model as any);
    },
  },
  modify: {
    extend: true,
    title: '修改角色',
    submit: model => {
      return api.role.updateRole(model.id, model);
    },
  },
});
</script>

<style scoped></style>

<route lang="json">
{
  "meta": {
    "name": "SystemRolePage",
    "sort": 10302,
    "title": "角色管理",
    "icon": "icon-park-outline-shield"
  }
}
</route>
