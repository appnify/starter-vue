<template>
  <BreadPage>
    <Table v-bind="table">

    </Table>
  </BreadPage>
</template>

<script setup lang="tsx">
import { api } from "@/api";
import { Table, useTable } from "@/components";
import { dayjs } from "@/libs/dayjs";
import { listToTree } from "@/utils/listToTree";

const table = useTable({
  data: async (model, paging) => {
    const res = await api.category.getCategorys({ ...model, ...paging });
    const data = listToTree(res.data.data);
    return { data: { data, total: (res.data as any).total } };
  },
  columns: [
    {
      title: "名称",
      dataIndex: "title",
      width: 240,
    },
    {
      title: "描述",
      dataIndex: "description",
    },
    {
      title: "别名",
      dataIndex: "slug",
      width: 200,
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      width: 200,
      render: ({ record }) => dayjs(record.createdAt).format(),
    },
    {
      type: "button",
      title: "操作",
      width: 120,
      buttons: [
        {
          type: 'modify',
          text: '修改'
        },
        {
          type: "delete",
          text: "删除",
          onClick({ record }) {
            return api.category.delCategory(record.id);
          },
        },
      ],
    },
  ],
  search: {
    items: [
      {
        field: "nickname",
        label: "登陆账号",
        type: "input",
        required: false,
        nodeProps: {
          placeholder: "名称关键字",
        },
        itemProps: {
          hideLabel: true,
        },
      },
    ],
  },
  create: {
    title: "添加分类",
    modalProps: {
      width: 580,
    },
    items: [
      {
        field: "parentId",
        label: "父级分类",
        type: "select",
        options: async () => {
          const res = await api.category.getCategorys({ size: 0 });
          return res.data.data.map(({ id, title }: any) => ({ value: id, label: title }));
        },
      },
      {
        field: "title",
        label: "分类名称",
        type: "input",
        required: true,
        nodeProps: {
          placeholder: "请输入分类名称",
        },
      },
      {
        field: "slug",
        label: "分类别名",
        type: "input",
        required: true,
        nodeProps: {
          placeholder: "请输入分类别名",
        },
      },
      {
        field: "description",
        label: "描述",
        type: "textarea",
        required: false,
        nodeProps: {
          placeholder: "请输入描述",
        },
      },
    ],
    submit: async ({ model }) => {
      return api.category.addCategory(model);
    },
  },
  modify: {
    extend: true,
    title: "修改分类",
    submit: async ({ model }) => {
      return api.category.updateCategory(model.id, model);
    },
  },
});
</script>

<style scoped></style>

<route lang="json">
{
  "meta": {
    "sort": 10300,
    "title": "分类管理",
    "icon": "icon-park-outline-category-management"
  }
}
</route>
