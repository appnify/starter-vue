<template>
  <AnPage>
    <CategoryTable />
  </AnPage>
</template>

<script setup lang="tsx">
import { useTable } from 'arconify';

defineOptions({
  name: 'ContentCommentPage',
});

definePage({
  meta: {
    title: '评论管理',
    icon: 'i-icon-park-outline-comments',
    componentName: "ContentCommentPage",
    sort: 10304,
    auth: 'content_comment_page'
  },
});

const CategoryTable = useTable({
  columns: [
    {
      title: '文章标题',
      dataIndex: 'title',
      render: ({ record }) => (
        <div class="overflow-hidden">
          <span>{record.title}</span>
          <span class="text-gray-400 text-xs truncate">{record.description.substr(0, 80)}</span>
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
  data: async model => {
    return { data: [], total: 100 };
  },
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
});
</script>

<style scoped></style>
