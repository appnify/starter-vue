<template>
  <AnPage>
    <CategoryTable />
  </AnPage>
</template>

<script setup lang="tsx">
import { api } from '@/api';
import { useTable } from 'arconify';

const CategoryTable = useTable({
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
          onClick: props => api.post.delPost(props.record.id),
        },
      ],
    },
  ],
  data: async model => [],
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
    submit: model => {
      return api.post.addPost(model as any);
    },
  },
  modify: {
    extend: true,
    submit: model => {
      return api.post.updatePost(model.id, model);
    },
  },
});
</script>

<route lang="json">
{
  "meta": {
    "sort": 10301,
    "title": "文章管理",
    "icon": "icon-park-outline-editor"
  }
}
</route>
