<template>
  <BreadPage>
    <Table v-bind="table"></Table>
  </BreadPage>
</template>

<script setup lang="tsx">
import { Table, useTable } from "@/components";

const table = useTable({
  data: async (model, paging) => ({ data: [{}], meta: { total: 0 } }),
  columns: [
    {
      type: "index",
    },
    {
      title: "姓名",
      dataIndex: "username",
      width: 200,
    },
    {
      title: "昵称",
      dataIndex: "name",
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      width: 200,
    },
    {
      title: "操作",
      type: "button",
      width: 70,
      buttons: [
        {
          type: "modify",
          text: "修改",
        },
      ],
    },
  ],
  common: {
    model: {
      avatarUrl: "",
    },
    items: [
      {
        field: "username",
        label: "姓名1",
        type: "input",
        required: true,
      },
      {
        field: "nickname",
        label: "昵称",
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
        field: "avatar?avatarUrl",
        type: "select",
      },
      {
        field: "startTime:endTime",
        label: "日期范围",
        type: "dateRange",
        nodeProps: {},
      },
    ],
    modalProps: {
      width: 772,
      maskClosable: false,
    },
    formProps: {
      layout: "vertical",
      class: "!grid grid-cols-2 gap-x-3",
    },
  },
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
    submit: ({ model }) => {
      console.log(model);
    },
  },
  modify: {
    extend: true,
    title: "修改用户",
    submit: ({ model }) => {
      console.log(model);
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
