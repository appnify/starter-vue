<template>
  <AnPage>
    <CategoryTable />
  </AnPage>
</template>

<script setup lang="tsx">
import { listToTree } from '@/utils/listToTree';
import { useTable } from 'arconify';

defineOptions({
  name: 'ContentMaterialCategoryPage',
});

definePage({
  meta: {
    title: '素材分类',
    componentName: 'ContentMaterialCategoryPage',
    sort: 10300,
    icon: 'icon-park-outline-category-management',
  },
});

const CategoryTable = useTable({
  data: async model => {
    return [];
  },
  columns: [
    {
      title: '分类名称',
      dataIndex: 'title',
      render: ({ record }) => (
        <div class="flex flex-col overflow-hidden">
          <span>
            {record.name ?? '无'}
            <span class="text-orange-500 truncate ml-2">@{record.code}</span>
          </span>
          <div class="text-gray-400 text-xs truncate mt-0.5">{record.description}</div>
        </div>
      ),
    },
    {
      type: 'button',
      title: '操作',
      width: 120,
      align: 'right',
      buttons: [
        {
          type: 'modify',
          text: '修改',
        },
        {
          type: 'delete',
          text: '删除',
          onClick({ record }) {},
        },
      ],
    },
  ],
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
    modalProps: {
      title: '添加分类',
      width: 580,
    },
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
    submit: model => {},
  },
  modify: {
    extend: true,
    submit: model => {},
  },
});
</script>

<style scoped></style>
