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
        <a-alert :show-icon="false" class="mb-3 !border-brand-500">
          <span class="text-brand-500 font-bold">{{ current?.name }}</span>
          <div class="mt-1">描述：{{ current?.description }}</div>
        </a-alert>
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
            <span class="text-gray-400 ml-2 text-xs">{record.code}</span>
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
  source(search) {
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
    model: {
      typeId: undefined,
    },
    items: [
      {
        field: 'name',
        label: '字典名',
        setter: 'input',
      },
      {
        field: 'code',
        label: '字典值',
        setter: 'input',
      },
      {
        field: 'description',
        label: '备注',
        setter: 'textarea',
      },
    ],
    submit: model => {
      return api.dict.addDict({ ...model, typeId: current.value?.id } as any);
    },
  },
  modify: {
    extend: true,
    title: '修改字典',
    submit: model => {
      return api.dict.setDict(model.id, { ...model, typeId: current.value?.id } as any);
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
