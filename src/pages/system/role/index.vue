<template>
  <BreadPage>
    <Table v-bind="table"></Table>
  </BreadPage>
</template>

<script setup lang="tsx">
import { api } from "@/api";
import { Table, useTable } from "@/components";
import { dayjs } from "@/libs";

const table = useTable({
  data: async (model, paging) => {
    return api.role.getRoles();
  },
  columns: [
    {
      title: "角色名称",
      dataIndex: "username",
      width: 200,
      render({ record }) {
        return (
          <div class="flex flex-col overflow-hidden">
            <span>{record.name}</span>
            <span class="text-gray-400 text-xs truncate">{record.slug}</span>
          </div>
        );
      },
    },
    {
      title: "角色描述",
      dataIndex: "description",
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      width: 200,
      render: ({ record }) => dayjs(record.createdAt).format(),
    },
    {
      title: "操作",
      type: "button",
      width: 184,
      buttons: [
        {
          type: "modify",
          text: "修改",
        },
        {
          text: '分配权限',
          onClick: ({ record }) => {
            console.log(record);
          },
        },
        {
          text: "删除",
          type: "delete",
          onClick: ({ record }) => {
            return api.role.delRole(record.id);
          },
        }
      ],
    },
  ],
  search: {
    items: [
      {
        extend: "name",
        required: false,
      },
    ],
  },
  create: {
    title: "新建角色",
    modalProps: {
      width: 580,
      maskClosable: false,
    },
    formProps: {
      layout: "vertical",
    },
    items: [
      {
        field: "name",
        label: "角色名称",
        type: "input",
        required: true,
      },
      {
        field: "slug",
        label: "角色标识",
        type: "input",
      },
      {
        field: "description",
        label: "个人描述",
        type: "textarea",
      },
      {
        field: "permissionIds",
        label: "关联权限",
        type: "select",
        options: () => api.permission.getPermissions(),
        nodeProps: {
          multiple: true,
        },
      },
    ],
    submit: ({ model }) => {
      return api.role.addRole(model);
    },
  },
  modify: {
    extend: true,
    title: "修改角色",
    submit: ({ model }) => {
      return api.role.updateRole(model.id, model);
    },
  },
});
</script>

<style scoped></style>

<route lang="json">
{
  "meta": {
    "sort": 10302,
    "title": "角色管理",
    "icon": "icon-park-outline-key"
  }
}
</route>
