<template>
  <BreadPage>
    <Table v-bind="table"></Table>
  </BreadPage>
</template>

<script setup lang="tsx">
import { api } from "@/api";
import { Table, useTable } from "@/components";
import { dayjs } from "@/plugins";
import { Avatar, Button } from "@arco-design/web-vue";

const table = useTable({
  data: async (model, paging) => {
    return api.user.getUsers({ ...model, ...paging });
  },
  columns: [
    {
      type: "index",
    },
    {
      title: "用户昵称",
      dataIndex: "username",
      width: 200,
      render: ({ record }) => {
        return (
          <div class="flex items-center">
            <Avatar size={32}>
              <img src={record.avatar} alt="" />
            </Avatar>
            <span class="ml-2 flex-1 flex flex-col overflow-hidden">
              <span>{record.nickname}</span>
              <span class="text-gray-400 text-xs truncate">账号：{record.username}</span>
            </span>
          </div>
        );
      },
    },
    {
      title: "用户描述",
      dataIndex: "description",
    },
    {
      title: "用户邮箱",
      dataIndex: "email",
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
      width: 148,
      buttons: [
        {
          type: "modify",
          text: "修改",
        },
        {
          type: "delete",
          text: "删除",
          onClick: async ({ record }) => {
            return api.user.delUser(record.id);
          },
        },
      ],
    },
  ],
  search: {
    items: [
      {
        extend: "username",
        required: false,
      },
    ],
  },
  create: {
    title: "新建用户",
    trigger: () => (
      <Button type="primary">
        {{
          icon: () => <i class="icon-park-outline-people-plus-one" />,
          default: () => "添加",
        }}
      </Button>
    ),
    modalProps: {
      width: 772,
      maskClosable: false,
    },
    formProps: {
      layout: "vertical",
      class: "!grid grid-cols-2 gap-x-3",
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
        type: "input",
      },
      {
        field: "password",
        label: "密码",
        type: "password",
      },
      {
        label: "头像",
        field: "avatar",
        type: "select",
      },
      {
        field: "[startTime,endTime]",
        label: "日期范围",
        type: "dateRange",
        nodeProps: {},
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
