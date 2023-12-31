<template>
  <div class="h-full w-full grid grid-rows-[auto_1fr] overflow-hidden">
    <div class="py-2 px-4 bg-white">
      <bread-crumb></bread-crumb>
    </div>
    <div class="grid grid-cols-[auto_1fr] gap-2 overflow-hidden m-4 rounded">
      <div class="bg-white p-4">
        <ani-group :current="current" @change="onTypeChange"></ani-group>
      </div>
      <div class="bg-white p-4">
        <div :show-icon="false" class="rounded mb-3 bg-gray-100 px-4 py-3">
          <span class="text-base">
            <i class="icon-park-outline-folder-close"></i>
            {{ current?.name }}
          </span>
          <div class="mt-1.5 text-gray-500">
            描述：{{ current?.description }}
          </div>
        </div>
        <dict-table></dict-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { DictType, api } from '@/api';
import { useCreateColumn, useTable, useUpdateColumn } from '@/components/AnTable';
import aniGroup from './components/group.vue';

defineOptions({ name: 'SystemDictPage' });
const current = ref<DictType>();
const onTypeChange = (item: DictType) => {
  current.value = item;
  tableRef.value?.refresh();
};

const { component: DictTable, tableRef } = useTable({
  columns: [
    {
      title: '字典项',
      dataIndex: 'name',
      render: ({ record }) => (
        <div>
          <div>
            {record.name}
            <span class="text-gray-400 ml-2 text-xs">@{record.code}</span>
          </div>
          <div class="text-gray-400 text-xs">{record.description}</div>
        </div>
      ),
    },
    useCreateColumn(),
    useUpdateColumn(),
    {
      title: '操作',
      type: 'button',
      width: 140,
      buttons: [
        {
          type: 'modify',
          text: '修改',
        },
        {
          type: 'delete',
          text: '删除',
          onClick: props => {
            return api.dict.delDict(props.record.id);
          },
        },
      ],
    },
  ],
  source: search => {
    return api.dict.getDicts({ ...search, typeId: current.value?.id } as any);
  },
  search: {
    hideSearch: true,
    items: [
      {
        field: 'name',
        label: '名称',
        setter: 'search',
        searchable: true,
        enterable: true,
      },
    ],
  },
  create: {
    title: '新增字典',
    width: 580,
    items: [
      {
        field: 'name',
        label: '字典名',
        setter: 'input',
        required: true,
      },
      {
        field: 'code',
        label: '字典值',
        setter: 'input',
        required: true,
      },
      {
        field: 'description',
        label: '备注',
        setter: 'textarea',
      },
    ],
    submit: model => {
      const data = { ...model, typeId: current.value?.id } as any;
      return api.dict.addDict(data);
    },
  },
  modify: {
    extend: true,
    title: '修改字典',
    submit: model => {
      const data = { ...model, typeId: current.value?.id } as any;
      return api.dict.setDict(model.id, data);
    },
  },
});
</script>

<style lang="less" scoped></style>

<route lang="json">
{
  "meta": {
    "name": "SystemDictPage",
    "sort": 20010,
    "title": "字典管理",
    "icon": "icon-park-outline-spanner"
  }
}
</route>
