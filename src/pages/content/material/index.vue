<template>
  <BreadPage>
    <template #content>
      <a-tabs class="tabs-page">
        <a-tab-pane key="1" title="全部素材">
          <div class="overflow-hidden grid grid-cols-[auto_1fr] gap-2 m-4 mt-1">
            <!-- <AnGroup class="bg-white p-4 w-[242px]" :current="current" @change="onCategoryChange"></AnGroup> -->
            <div class="bg-white p-4">
              <MaterialTable>
                <template #action>
                  <AnUpload @success="() => tableRef?.refresh()"></AnUpload>
                </template>
              </MaterialTable>
              <AnPreview v-model:visible="viewer.visible" :type="viewer.type" :url="viewer.url"></AnPreview>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" title="分类管理">
          <div class="overflow-hidden grid grid-cols-[auto_1fr] gap-2 m-4 mt-1">
            <div class="bg-white p-4">
              <AnCategory></AnCategory>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="3" title="显示设置"></a-tab-pane>
      </a-tabs>
    </template>
  </BreadPage>
</template>

<script setup lang="tsx">
import { FileCategory, api } from '@/api';
import { useCreateColumn, useTable, useTableDelete, useUpdateColumn } from '@/components/AnTable';
import { Message } from '@arco-design/web-vue';
import numeral from 'numeral';
import AnCategory from './components/AnCategory.vue';
import AnPreview from './components/AnPreview.vue';
import AnUpload from './components/AnUpload.vue';
import { getIcon } from './components/util';

const current = ref<FileCategory>();
const viewer = reactive({ visible: false, url: undefined, type: undefined });

const preview = (record: any) => {
  const [type] = record.mimetype.split('/');
  viewer.url = record.path;
  viewer.type = type;
  viewer.visible = true;
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
  Message.success(`已复制 ${record.name} 的地址!`);
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
      render: ({ record }) => {
        return (
          <div class="group flex items-center gap-4">
            <div class="w-8 flex justify-center">
              {record.mimetype.startsWith('image1') ? (
                <a-avatar size={32} shape="square">
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
                <span
                  class="inline-block w-5 text-xs text-gray-400 ml-0"
                  title="复制地址"
                  onClick={() => copyLink(record)}
                >
                  <i class="hidden! group-hover:inline-block! icon-park-outline-copy hover:text-gray-700 cursor-pointer"></i>
                </span>
              </span>
              <div class="h-5 inline-flex items-center text-xs text-gray-400 space-x-2">
                <span>
                  <i class="icon-park-outline-folder-close mr-1"></i>
                  {record.category?.name ?? '默认分类'}
                </span>
                <span>{numeral(record.size).format('0 b')}</span>
              </div>
            </div>
          </div>
        );
      },
    },
    useCreateColumn(),
    useUpdateColumn(),
    {
      type: 'button',
      title: '操作',
      width: 160,
      buttons: [
        {
          type: 'modify',
          text: '修改',
          icon: 'icon-park-outline-edit',
        },
        {
          type: 'delete',
          text: '删除',
          onClick: props => {
            return api.file.delFile(props.record.id);
          },
          buttonProps: {
            status: 'danger',
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
        field: 'type',
        label: '类型',
        setter: 'select',
        options: [
          {
            label: '视频',
            value: 1,
          },
          {
            label: '音频',
            value: 2,
          },
          {
            label: '图片',
            value: 3,
          },
          {
            label: '文本',
            value: 4,
          },
          {
            label: '其他',
            value: 5,
          },
        ],
        setterProps: {
          style: {
            width: '100px',
          },
          triggerProps: {
            autoFitPopupMinWidth: true,
          },
        },
      },
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
        field: 'name',
        label: '文件名',
        setter: 'input',
        required: true,
      },
      {
        field: 'categoryId',
        label: '分类',
        setter: 'select',
        options: () => api.fileCategory.getFileCategorys({ size: 0 }) as any,
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
