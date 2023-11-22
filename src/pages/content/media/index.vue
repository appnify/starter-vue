<template>
  <BreadPage>
    <template #content>
      <div class="overflow-hidden grid grid-cols-[auto_1fr] gap-2 m-4">
        <AnGroup class="bg-white p-4 w-[242px]" :current="current" @change="onCategoryChange"></AnGroup>
        <div class="bg-white p-4">
          <MaterialTable>
            <template #action>
              <AnUpload></AnUpload>
            </template>
          </MaterialTable>
          <a-image-preview v-model:visible="visible" :src="image"></a-image-preview>
        </div>
      </div>
    </template>
  </BreadPage>
</template>

<script setup lang="tsx">
import { FileCategory, api } from '@/api';
import { useCreateColumn, useTable, useUpdateColumn } from '@/components/AnTable';
import { getIcon } from './components/util';
import numeral from 'numeral';
import AnGroup from './components/AnGroup.vue';
import AnUpload from './components/AnUpload.vue';

const visible = ref(false);
const current = ref<FileCategory>();
const image = ref('');

const preview = (record: any) => {
  if (!record.mimetype.startsWith('image')) {
    window.open(record.path, '_blank');
    return;
  }
  image.value = record.path;
  visible.value = true;
};

const onCategoryChange = (category: FileCategory) => {
  if (props.search?.model) {
    props.search.model.categoryId = category.id;
  }
  current.value = category;
  tableRef.value?.refresh();
};

const {
  component: MaterialTable,
  tableRef,
  props,
} = useTable({
  columns: [
    {
      title: '文件名称',
      dataIndex: 'name',
      render: ({ record }) => (
        <div class="flex items-center gap-2">
          <div class="w-8 flex justify-center">
            {record.mimetype.startsWith('image') ? (
              <a-avatar size={26} shape="square">
                <img src={record.path}></img>
              </a-avatar>
            ) : (
              <i class={`${getIcon(record.mimetype)} text-4xl`}></i>
            )}
          </div>
          <div class="flex flex-col overflow-hidden">
            <span
              class="hover:text-brand-500 hover:decoration-underline underline-offset-2 cursor-pointer"
              onClick={() => preview(record)}
            >
              {record.name}
            </span>
            <span class="text-gray-400 text-xs truncate">
              {numeral(record.size).format('0 b')}
              <span class="ml-2">{record.category?.name}</span>
            </span>
          </div>
        </div>
      ),
    },
    useCreateColumn(),
    useUpdateColumn(),
    {
      type: 'button',
      title: '操作',
      width: 160,
      buttons: [
        {
          text: '下载',
          onClick: props => {
            window.open(props.record.path, '_blank');
          },
        },
        {
          type: 'modify',
          text: '修改',
        },
        {
          type: 'delete',
          text: '删除',
          onClick: props => {
            return api.file.delFile(props.record.id);
          },
        },
      ],
    },
  ],
  source: async model => {
    return api.file.getFiles(model);
  },
  search: {
    hideSearch: false,
    model: {
      categoryId: undefined,
    },
    items: [
      {
        field: 'name',
        label: '素材名称',
        setter: 'search',
        searchable: true,
        enterable: true,
      },
    ],
  },
  modify: {
    title: '修改素材',
    width: 580,
    items: [
      {
        field: 'categoryId',
        label: '分类',
        setter: 'select',
        options: () => api.fileCategory.getFileCategorys({ size: 0 }) as any,
      },
      {
        field: 'name',
        label: '名称',
        setter: 'input',
      },
      {
        field: 'description',
        label: '描述',
        setter: 'textarea',
      },
    ],
    submit: model => {
      return api.file.setFile(model.id, model);
    },
  },
});
</script>

<style scoped></style>

<route lang="json">
{
  "meta": {
    "sort": 10305,
    "title": "素材管理",
    "icon": "icon-park-outline-movie-board"
  }
}
</route>
