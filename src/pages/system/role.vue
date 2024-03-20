<template>
  <AnPage>
    <RoleTable></RoleTable>
  </AnPage>
</template>

<script setup lang="tsx">
import { addRole, delRole, updateRole } from '@/api/Role';
import { useTable } from 'arconify';

defineOptions({
  name: 'SystemRolePage',
});

definePage({
  meta: {
    title: '角色管理',
    componentName: 'SystemRolePage',
    sort: 10302,
    auth: ['role'],
    icon: 'icon-park-outline-shield',
  },
});

const RoleTable = useTable({
  data: () => {
    return [];
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
            return delRole(record.id);
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
    modalProps: {
      title: '新建角色',
      width: 580,
    },
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
      return addRole(model as any);
    },
  },
  modify: {
    extend: true,
    submit: model => {
      return updateRole(model.id, model);
    },
  },
});
</script>

<style scoped></style>
