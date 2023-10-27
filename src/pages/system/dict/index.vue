<template>
  <div class="h-full w-full grid grid-rows-[auto_1fr] overflow-hidden">
    <div class="py-2 px-4 bg-white">
      <bread-crumb></bread-crumb>
    </div>
    <div class="grid grid-cols-[auto_1fr] gap-4 overflow-hidden bg-white p-4 m-4 rounded">
      <div>
        <ani-group :current="current" @change="onTypeChange"></ani-group>
      </div>
      <div>
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
import { DictType, api } from "@/api";
import aniGroup from "./components/group.vue";
import { useAniTable, createColumn, updateColumn } from "@/components";

const current = ref<DictType>();
const onTypeChange = (item: DictType) => {
  current.value = item;
  dict.refresh();
};

const [dictTable, dict] = useAniTable({
  async data(search, paging) {
    return api.dict.getDicts({ ...search, ...paging, typeId: current.value?.id } as any);
  },
  columns: [
    {
      title: "字典项",
      dataIndex: "name",
      render: ({ record }) => {
        return (
          <div>
            <div>
              {record.name}: {record.code}
            </div>
            <div class="text-gray-400 text-xs">{record.description}</div>
          </div>
        );
      },
    },
    createColumn,
    updateColumn,
    {
      title: "操作",
      type: "button",
      width: 140,
      buttons: [
        {
          type: "modify",
          text: "修改",
        },
        {
          type: "delete",
          text: "删除",
          onClick: ({ record }) => {
            return api.dict.delDict(record.id);
          },
        },
      ],
    },
  ],
  search: {
    button: false,
    items: [
      {
        field: "name",
        label: "名称",
        type: "search",
        searchable: true,
        enterable: true,
        nodeProps: {
          placeholder: "字典名称",
        },
        itemProps: {
          hideLabel: true,
        },
      },
    ],
  },
  create: {
    title: '新增字典',
    model: {
      typeId: undefined,
    },
    modalProps: {
      width: 580,
    },
    items: [
      {
        field: "name",
        label: "字典名",
        type: "input",
      },
      {
        field: "code",
        label: "字典指",
        type: "input",
      },
      {
        field: "description",
        label: "备注",
        type: "textarea",
      },
    ],
    submit: async ({ model }) => {
      return api.dict.addDict({ ...model, typeId: current.value?.id });
    },
  },
  modify: {
    extend: true,
    title: "修改字典",
    submit: async ({ model }) => {
      return api.dict.setDict(model.id, { ...model, typeId: current.value?.id });
    },
  },
});
</script>

<style lang="less" scoped></style>

<route lang="json">
{
  "meta": {
    "sort": 20010,
    "title": "字典管理",
    "icon": "icon-park-outline-spanner"
  }
}
</route>
