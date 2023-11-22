<template>
  <BreadPage>
    <CategoryTable />
  </BreadPage>
</template>

<script setup lang="tsx">
import { api } from '@/api';
import { useCreateColumn, useTable, useUpdateColumn } from '@/components/AnTable';
import { listToTree } from '@/utils/listToTree';

const { component: CategoryTable } = useTable({
  columns: [
    {
      title: '名称',
      dataIndex: 'title',
      width: 240,
      render: ({ record }) => (
        <div class="flex flex-col overflow-hidden">
          <span>{record.title}</span>
          <span class="text-gray-400 text-xs truncate">#{record.slug}</span>
        </div>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    useCreateColumn(),
    useUpdateColumn(),
    {
      type: 'button',
      title: '操作',
      width: 120,
      buttons: [
        {
          type: 'modify',
          text: '修改',
        },
        {
          type: 'delete',
          text: '删除',
          onClick({ record }) {
            return api.category.delCategory(record.id);
          },
        },
      ],
    },
  ],
  source: async model => {
    const res = await api.category.getCategories(model);
    const data = listToTree(res.data.data ?? []);
    return { data: { data, total: (res.data as any).total } };
  },
  search: [
    {
      field: 'nickname',
      label: '登陆账号',
      setter: 'search',
      enterable: true,
      searchable: true,
    },
  ],
  create: {
    title: '添加分类',
    width: 580,
    items: [
      {
        field: 'title',
        label: '分类名称',
        setter: 'input',
        required: true,
      },
      {
        field: 'slug',
        label: '分类别名',
        setter: 'input',
        required: true,
      },
      {
        field: 'description',
        label: '描述',
        setter: 'textarea',
        required: false,
      },
    ],
    submit: model => {
      return api.category.addCategory(model as any);
    },
  },
  modify: {
    extend: true,
    title: '修改分类',
    submit: model => {
      return api.category.setCategory(model.id, model as any);
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
