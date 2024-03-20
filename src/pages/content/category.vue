<template>
  <AnPage>
    <CategoryTable />
  </AnPage>
</template>

<script setup lang="tsx">
import { useTable } from 'arconify';

defineOptions({
  name: 'ContentCategoryPage',
});

definePage({
  meta: {
    title: '分类管理',
    componentName: 'ContentCategoryPage',
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
            {record.title}
            <span class="text-gray-400 text-xs truncate ml-2">@{record.slug}</span>
          </span>
          <div class="text-gray-400 text-xs truncate mt-0.5">{record.description}</div>
        </div>
      ),
    },
    {
      type: 'button',
      title: '操作',
      width: 180,
      buttons: [
        {
          text: '文章',
        },
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
      field: 'nickname',
      label: '登陆账号',
      setter: 'search',
      enterable: true,
      searchable: true,
    },
  ],
  create: {
    modalProps: {
      width: 580,
    },
    items: [
      {
        field: 'title',
        label: '名称',
        setter: 'input',
        required: true,
      },
      {
        field: 'slug',
        label: '别名',
        setter: 'input',
        required: true,
        setterProps: {
          placeholder: '只包含字母、小数和连字符',
        },
      },
      {
        field: 'description',
        label: '描述',
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
