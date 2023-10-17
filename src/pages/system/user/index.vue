<template>
  <BreadPage>
    <Table v-bind="table"> </Table>
  </BreadPage>
</template>

<script setup lang="tsx">
import { api } from "@/api";
import { Table, createColumn, updateColumn, useTable } from "@/components";

const table = useTable({
  data: async (model, paging) => {
    return api.user.getUsers({ ...model, ...paging });
  },
  columns: [
    {
      title: "用户昵称",
      dataIndex: "username",
      width: 180,
      render: ({ record }) => (
        <div class="flex items-center">
          <a-avatar size={32}>
            <img src={`https://picsum.photos/200?${Math.random()}`} alt="" />
          </a-avatar>
          <span class="ml-2 flex-1 flex flex-col overflow-hidden">
            <span>{record.nickname}</span>
            <span class="text-gray-400 text-xs truncate">@{record.username}</span>
          </span>
        </div>
      ),
    },
    {
      title: "用户描述",
      dataIndex: "description",
    },
    {
      title: "用户邮箱",
      dataIndex: "email",
      width: 200,
    },
    createColumn,
    updateColumn,
    {
      title: "操作",
      type: "button",
      width: 180,
      buttons: [
        {
          type: "modify",
          text: "修改",
        },
        {
          text: "设置密码",
        },
        {
          type: "delete",
          text: "删除",
          onClick: async ({ record }) => {
            return api.user.delUser(record.id, { toast: true });
          },
        },
      ],
    },
  ],
  search: {
    button: false,
    items: [
      {
        extend: "nickname",
        required: false,
        type: 'search',
        enableLoad: true,
        itemProps: {
          hideLabel: true,
        },
        nodeProps: {
          placeholder: "用户昵称",
        },
      },
    ],
  },
  create: {
    title: "新建用户",
    modalProps: {
      width: 732,
      maskClosable: false,
    },
    formProps: {
      layout: "vertical",
      class: "!grid grid-cols-2 gap-x-6",
    },
    items: [
      {
        field: "username",
        label: "登录账号",
        type: "input",
        required: true,
      },
      {
        field: "nickname",
        label: "用户昵称",
        type: "input",
      },
      {
        field: "password",
        label: "密码",
        type: "input",
      },
      {
        field: "roleIds",
        label: "关联角色",
        type: "select",
        options: () => api.role.getRoles(),
        nodeProps: {
          multiple: true,
        },
      },
      {
        field: "description",
        label: "个人描述",
        type: "textarea",
        itemProps: {
          class: "col-span-2",
        },
        nodeProps: {
          class: 'h-[96px]'
        }
      },
    ],
    submit: ({ model }) => {
      return api.user.addUser(model);
    },
  },
  modify: {
    extend: true,
    title: "修改用户",
    submit: ({ model }) => {
      return api.user.updateUser(model.id, model);
    },
  },
});
</script>

<style scoped></style>

<route lang="json">
{
  "meta": {
    "sort": 10301,
    "title": "用户管理",
    "icon": "icon-park-outline-user"
  }
}
</route>
