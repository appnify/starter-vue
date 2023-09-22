<template>
  <BreadPage>
    <a-radio-group type="button" v-model="type">
      <a-radio value="all">全部</a-radio>
      <a-radio value="all1">已激活</a-radio>
      <a-radio value="all2">未激活</a-radio>
    </a-radio-group>
    <Table v-bind="table" class="pt-4">
      <template #action>
        <a-button status="danger" type="outline" :disabled="true">
          <template #icon>
            <i class="icon-park-outline-delete"></i>
          </template>
          删除
        </a-button>
      </template>
    </Table>
  </BreadPage>
</template>

<script setup lang="tsx">
import { api } from "@/api";
import { Table, useTable } from "@/components";
import { dayjs } from "@/libs/dayjs";

const type = ref("all");

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
          <a-avatar size={40}>
            <img src={record.avatar || "https://github.com/juetan.png"} alt="" />
          </a-avatar>
          <span class="ml-2 flex-1 flex flex-col overflow-hidden">
            <span>{record.nickname}</span>
            <span class="text-gray-400 text-xs truncate">ID: {record.username}</span>
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
    {
      title: "创建时间",
      dataIndex: "createdAt",
      width: 200,
      render: ({ record }) => dayjs(record.createdAt).format(),
    },
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
    items: [
      {
        extend: "nickname",
        required: false,
        itemProps: {
          hideLabel: true,
        },
        nodeProps: {
          placeholder: "输入用户昵称关键字",
        },
      },
    ],
  },
  create: {
    title: "新建用户",
    modalProps: {
      width: 772,
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
        field: "description",
        label: "个人描述",
        type: "textarea",
        itemProps: {
          class: "col-span-2",
        },
      },
      {
        field: "password",
        label: "密码",
        type: "password",
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
        label: "头像",
        field: "avatarId",
        type: "custom",
        component: ({ field, model }) => {
          return (
            <a-avatar size={40}>
              <img src={model?.[field]} alt="" />
            </a-avatar>
          );
        },
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
