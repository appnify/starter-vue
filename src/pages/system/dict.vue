<template>
  <AnPage>
    <div class="grid grid-cols-[auto_1fr] divide-x gap-2 overflow-hidden rounded">
      <div class=" ">
        <an-group :current="current" @change="onTypeChange"></an-group>
      </div>
      <div class=" pl-2">
        <div :show-icon="false" class="rounded mb-3 bg-gray-100 px-4 py-3">
          <span class="text-base">
            <i class="i-icon-park-outline-folder-close"></i>
            {{ current?.name }}
          </span>
          <div class="mt-1.5 text-gray-500">描述：{{ current?.description }}</div>
        </div>
        <DictTable></DictTable>
      </div>
    </div>
  </AnPage>
</template>

<script setup lang="tsx">
import AnGroup from '@/pages/components/Group.vue';
import { useTable } from 'arconify';

defineOptions({
  name: 'SystemDictPage',
});

definePage({
  meta: {
    title: '字典管理',
    componentName: "SystemDictPage",
    cache: 'SystemDictPage',
    sort: 20010,
    icon: 'i-icon-park-outline-spanner',
  },
});

const current = ref<any>();
const onTypeChange = (item: any) => {
  current.value = item;
  DictTable.tableRef.value?.refresh();
};

const DictTable = useTable({
  data: search => {
    return [];
  },
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
            return props.record.id;
          },
        },
      ],
    },
  ],
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
        setter: 'number',
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
      return;
    },
  },
  modify: {
    extend: true,
    submit: model => {
      const data = { ...model, typeId: current.value?.id } as any;
      return;
    },
  },
});
</script>

<style lang="less" scoped></style>
