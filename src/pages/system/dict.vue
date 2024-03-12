<template>
  <div class="h-full w-full grid grid-rows-[auto_1fr] overflow-hidden">
    <div class="py-2 px-4 bg-white">
      <bread-crumb></bread-crumb>
    </div>
    <div class="grid grid-cols-[auto_1fr] gap-2 overflow-hidden m-4 rounded">
      <div class="bg-white p-4">
        <an-group :current="current" @change="onTypeChange"></an-group>
      </div>
      <div class="bg-white p-4">
        <div :show-icon="false" class="rounded mb-3 bg-gray-100 px-4 py-3">
          <span class="text-base">
            <i class="icon-park-outline-folder-close"></i>
            {{ current?.name }}
          </span>
          <div class="mt-1.5 text-gray-500">描述：{{ current?.description }}</div>
          <div class="mt-2 flex gap-1">
            <a-link>修改</a-link>
            <a-link status="danger">删除</a-link>
          </div>
        </div>
        <dict-table></dict-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { DictType, api } from '@/api';
import { useTable } from 'arconify';
import AnGroup from '@/pages/components/Group.vue';

defineOptions({
  name: 'SystemDictPage',
});

definePage({
  meta: {
    title: '字典管理',
    cache: 'SystemDictPage',
    sort: 20010,
    icon: 'icon-park-outline-spanner',
  },
});

const current = ref<DictType>();
const onTypeChange = (item: DictType) => {
  current.value = item;
  DictTable.tableRef.value?.refresh();
};

const DictTable = useTable({
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
  data: search => {
    return [];
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
    modalProps: {
      title: '新增字典',
      width: 580,
    },
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

    submit: model => {
      const data = { ...model, typeId: current.value?.id } as any;
      return api.dict.setDict(model.id, data);
    },
  },
});
</script>

<style lang="less" scoped></style>
