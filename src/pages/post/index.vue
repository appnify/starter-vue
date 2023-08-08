<template>
  <div class="m-4 p-4 bg-white">
    <Table v-bind="table" />
  </div>
</template>

<script setup lang="tsx" name="PostPage">
import { api } from "@/api";
import { Table, useTable } from "@/components";
import { dayjs } from "@/plugins";

const table = useTable({
  data: async (model, paging) => {
    return api.post.getPosts({ ...model, ...paging });
  },
  columns: [
    {
      type: "index",
    },
    {
      title: "文章名称",
      dataIndex: "title",
      width: 200,
    },
    {
      title: "文章描述",
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
      type: "dropdown",
      width: 60,
      align: "center",
      dropdowns: [
        {
          type: "modify",
          text: "修改",
          icon: "icon-park-outline-edit",
        },
        {
          type: "delete",
          text: "删除",
          icon: "icon-park-outline-delete",
          onClick: ({ record }) => {
            return api.post.delPost(record.id);
          },
          doptionProps: {
            class: "!text-red-500 !hover-bg-red-50",
          },
        },
      ],
    },
  ],
  search: {
    items: [
      {
        extend: "title",
        required: false,
      },
    ],
  },
  create: {
    title: "新建文章",
    modalProps: {
      width: 580,
      maskClosable: false,
    },
    formProps: {
      layout: "vertical",
    },
    items: [
      {
        field: "title",
        label: "文章名称",
        type: "input",
        required: true,
      },
      {
        field: "slug",
        label: "文章标识",
        type: "input",
      },
      {
        field: "description",
        label: "文章描述",
        type: "input",
      },
      {
        field: "content",
        label: "文章内容",
        type: "textarea",
      },
    ],
    submit: ({ model }) => {
      return api.post.addPost(model);
    },
  },
  modify: {
    extend: true,
    title: "修改文章",
    submit: ({ model }) => {
      return api.post.updatePost(model.id, model);
    },
  },
});
</script>

<style scoped></style>

<route lang="json">
{
  "meta": {
    "sort": 10300,
    "title": "文章管理",
    "icon": "icon-park-outline-document-folder"
  }
}
</route>
