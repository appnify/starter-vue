<template>
  <a-tabs class="tabs-page" :destroy-on-hide="true">
    <a-tab-pane key="1" title="全部素材">
      <div class="overflow-hidden grid grid-cols-[auto_1fr] gap-2 m-4 mt-0">
        <!-- <AnGroup class="bg-white p-4 w-[242px]" :current="current" @change="onCategoryChange"></AnGroup> -->
        <div class="bg-white p-4">
          <MaterialTable>
            <template #action>
              <AnUpload @success="() => MaterialTable.tableRef.value?.refresh()"></AnUpload>
            </template>
          </MaterialTable>
          <AnPreview v-model:visible="viewer.visible" :type="viewer.type" :url="viewer.url"></AnPreview>
        </div>
      </div>
    </a-tab-pane>
    <a-tab-pane key="2" title="分类管理">
      <div class="overflow-hidden grid grid-cols-[auto_1fr] gap-2 m-4 mt-0">
        <div class="bg-white p-4">
          <AnCategory></AnCategory>
        </div>
      </div>
    </a-tab-pane>
    <a-tab-pane key="3" title="素材设置"> </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="tsx">
import { FileCategory, api } from '@/api';
import { FileTypes } from '@/constants/file';
import { Message } from '@arco-design/web-vue';
import { useTable } from 'arconify';
import numeral from 'numeral';
import AnCategory from './AnCategory.vue';
import AnPreview from './AnPreview.vue';
import AnUpload from './AnUpload.vue';
import { getIcon } from './util';

const current = ref<FileCategory>();
const viewer = reactive({ visible: false, url: undefined, type: undefined });

const preview = (record: any) => {
  const [type] = record.mimetype.split('/');
  viewer.url = record.path;
  viewer.type = type;
  viewer.visible = true;
};

const onCategoryChange = (category: FileCategory) => {
  if (MaterialTable.tableRef.value?.search?.model) {
    MaterialTable.tableRef.value.search.model.categoryId = category.id;
  }
  current.value = category;
  MaterialTable.tableRef.value?.refresh();
};

const copyLink = (record: Recordable) => {
  window.navigator.clipboard.writeText(record.path);
  Message.success(`已复制 ${record.name} 的地址!`);
};

const MaterialTable = useTable({
  columns: [
    {
      title: '文件名称',
      dataIndex: 'name',
      render: ({ record }) => {
        return (
          <div class="group flex items-center gap-3">
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
                <span class="truncate hover:text-brand-500 hover:decoration-underline underline-offset-2 cursor-pointer" onClick={() => preview(record)}>
                  {record.name}
                </span>
                {/* <span
                  class="inline-block w-5 text-xs text-gray-400 ml-0"
                  title="复制地址"
                  onClick={() => copyLink(record)}
                >
                  <i class="hidden! group-hover:inline-block! i-icon-park-outline-copy hover:text-gray-700 cursor-pointer"></i>
                </span> */}
              </span>
              {/* <div class="h-5 inline-flex items-center text-xs text-gray-400 space-x-4 ">
                <span>
                  {record.category?.name ?? '默认分类'}
                </span>
              </div> */}
            </div>
          </div>
        );
      },
    },
    {
      title: '分类',
      width: 150,
      render: ({ record }) => record.category?.name ?? '默认分类',
    },
    {
      title: '文件大小',
      width: 150,
      render: ({ record }) => numeral(record.size).format('0 b'),
    },
    {
      type: 'button',
      title: '操作',
      width: 160,
      align: 'right',
      buttons: [
        {
          text: '下载',
        },
        {
          type: 'modify',
          text: '修改',
          icon: 'i-icon-park-outline-edit',
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
  data: async model => {
    return [];
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
        options: FileTypes.raw,
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
    modalProps: {
      title: '修改素材',
      width: 580,
    },
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

<style lang="less">
.tabs-page {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
  .arco-tabs-content {
    overflow: auto;
    // padding-top: 0;
    // padding: 16px;
  }
  // .arco-tabs-content-list {
  //   background-color: #fff;
  //   padding: 16px 20px;
  // }
}
</style>

<route lang="json">
{
  "meta": {
    "sort": 10300,
    "title": "素材管理",
    "icon": "i-icon-park-outline-movie-board"
  }
}
</route>
./util
