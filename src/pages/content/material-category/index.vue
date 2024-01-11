<template>
  <bread-page>
    <CategoryTable />
  </bread-page>
</template>

<script setup lang="tsx">
import { api } from '@/api';
import { useCreateColumn, useTable, useUpdateColumn } from '@/components/AnTable';
import { listToTree } from '@/utils/listToTree';

const { component: CategoryTable } = useTable({
  columns: [
    {
      title: '分类名称',
      dataIndex: 'title',
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
    const res = await api.fileCategory.getFileCategorys(model);
    const data = listToTree(res.data.data ?? []);
    return { data: { data, total: (res.data as any).total } };
  },
  search: [
    {
      field: 'name',
      label: '分类名称',
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
        field: 'name',
        label: '名称',
        setter: 'input',
        required: true,
      },
      {
        field: 'code',
        label: '别名',
        setter: 'input',
        required: true,
        setterProps: {
          placeholder: '只包含字母、小数和连字符',
        },
      },
      {
        field: 'description',
        label: '备注',
        setter: 'textarea',
        required: false,
      },
    ],
    submit: model => {
      return api.fileCategory.addFileCategory(model as any);
    },
  },
  modify: {
    extend: true,
    title: '修改分类',
    submit: model => {
      return api.fileCategory.setFileCategory(model.id, model as any);
    },
  },
});
</script>

<style scoped></style>

<route lang="json">
{
  "meta": {
    "sort": 10300,
    "title": "素材分类",
    "icon": "icon-park-outline-category-management"
  }
}
</route>
