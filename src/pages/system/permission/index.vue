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
    return api.permission.getPermissions();
  },
  columns: [
    {
      title: "权限名称",
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
      title: "权限描述",
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
      width: 110,
      buttons: [
        {
          type: "modify",
          text: "修改",
        },
        {
          type: 'delete',
          text: '删除',
        }
      ],
    },
  ],
  search: {
    items: [
      {
        field: "name",
        label: "权限名称",
        type: "input",
        required: false,
        nodeProps: {
          placeholder: '请输入名称关键字'
        },
        itemProps: {
          hideLabel: true,
        }
      },
    ],
  },
  create: {
    title: "添加权限",
    items: [
      {
        field: "name",
        label: "角色名称",
        type: "input",
        required: true,
      },
      {
        field: 'order',
        label: '排序',
        type: 'number',
        nodeProps: {
          min: 0,
        }
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
    ],
    modalProps: {
      width: 580,
      maskClosable: false,
    },
    formProps: {
      layout: "vertical",
    },
    submit: ({ model }) => {
      return api.permission.addPermission(model);
    },
  },
  modify: {
    extend: true,
    title: "修改权限",
    submit: ({ model }) => {
      return api.permission.updatePermission(model.id, model);
    },
  },
});
</script>

<style scoped></style>

<route lang="json">
{
  "meta": {
    "sort": 10303,
    "title": "权限管理",
    "icon": "icon-park-outline-permissions"
  }
}
</route>
