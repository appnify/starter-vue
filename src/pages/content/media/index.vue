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
import { useCreateColumn, useTable, useTableDelete, useUpdateColumn } from '@/components/AnTable';
import { Message } from '@arco-design/web-vue';
import numeral from 'numeral';
import AnGroup from './components/AnGroup.vue';
import AnUpload from './components/AnUpload.vue';
import { getIcon } from './components/util';

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

const copyLink = (record: Recordable) => {
  window.navigator.clipboard.writeText(record.path);
  Message.success(`提示：已复制 ${record.name} 的地址!`);
};

const {
  component: MaterialTable,
  tableRef,
  props,
} = useTable({
  plugins: [useTableDelete()],
  columns: [
    {
      title: '文件名称',
      dataIndex: 'name',
      render: ({ record }) => (
        <div class="group flex items-center gap-2">
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
            <span class="flex items-center gap-2">
              <span
                class="truncate hover:text-brand-500 hover:decoration-underline underline-offset-2 cursor-pointer"
                onClick={() => preview(record)}
              >
                {record.name}
              </span>
              <span class="inline-block w-5 text-xs text-gray-400 ml-0" title="复制地址" onClick={() => copyLink(record)}>
                <i class="hidden! group-hover:inline-block! icon-park-outline-copy hover:text-gray-700 cursor-pointer"></i>
              </span>
            </span>
            <div class="h-5 inline-flex items-center text-xs text-gray-400 space-x-4">
              <span>
                <i class="icon-park-outline-folder-close mr-1"></i>
                {record.category || '默认分类'}
              </span>
              <span>{numeral(record.size).format('0 b')}</span>
            </div>
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
          buttonProps: {
            status: 'danger'
          }
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
    "sort": 10300,
    "title": "素材管理",
    "icon": "icon-park-outline-movie-board"
  }
}
</route>
