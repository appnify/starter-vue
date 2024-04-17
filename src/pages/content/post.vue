<template>
  <AnPage>
    <CategoryTable />
  </AnPage>
</template>

<script setup lang="tsx">
import { useTable } from 'arconify'

defineOptions({
  name: 'ContentPostPage',
})

definePage({
  meta: {
    title: '文章管理',
    icon: 'i-icon-park-outline-editor',
    componentName: 'ContentPostPage',
    sort: 10301,
    auth: 'content_post_page',
  },
})

const CategoryTable = useTable({
  data: async params => [],
  columns: [
    {
      title: '文章标题',
      dataIndex: 'title',
      render: ({ record }) => (
        <div class="overflow-hidden">
          <span>{record.title}</span>
          <div class="text-gray-400 text-xs truncate">{record.description}</div>
        </div>
      ),
    },
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
        },
      ],
    },
  ],
  search: [
    {
      field: 'nickname',
      label: '文章标题',
      setter: 'search',
      enterable: true,
      searchable: true,
    },
  ],
  create: {
    modalProps: {
      title: '添加文章',
      width: 1080,
    },
    items: [
      {
        field: 'title',
        label: '标题',
        setter: 'input',
        required: true,
      },
      {
        field: 'slug',
        label: '别名',
        setter: 'input',
        required: true,
      },
      {
        field: 'description',
        label: '内容',
        setter: 'textarea',
        required: false,
        setterProps: {
          maxLength: 2000,
        },
      },
    ],
    submit: model => {},
  },
  modify: {
    extend: true,
    submit: model => {},
  },
})
</script>
