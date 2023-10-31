<template>
  <BreadPage>
    <div class="overflow-hidden h-full grid grid-cols-[auto_1fr] gap-4">
      <ani-group></ani-group>
      <div>
        <Table v-bind="table">
          <template #action>
            <a-button type="primary" @click="uploadRef?.open()">
              <template #icon>
                <i class="icon-park-outline-upload"></i>
              </template>
              上传
            </a-button>
            <a-button type="outline" status="danger" :disabled="!selected.length" @click="onDeleteMany">
              批量删除
            </a-button>
            <ani-upload ref="uploadRef"></ani-upload>
          </template>
        </Table>
        <a-image-preview v-model:visible="visible" :src="image"></a-image-preview>
      </div>
    </div>
  </BreadPage>
</template>

<script setup lang="tsx">
import { api } from "@/api";
import { Table, createColumn, updateColumn, useTable } from "@/components";
import numeral from "numeral";
import AniGroup from "./components/group.vue";
import AniUpload from "./components/upload.vue";
import { delConfirm } from "@/utils";

const visible = ref(false);
const image = ref("");
const selected = ref<number[]>([]);
const preview = (record: any) => {
  if (!record.mimetype.startsWith("image")) {
    window.open(record.path, "_blank");
    return;
  }
  image.value = record.path;
  visible.value = true;
};

const onDeleteMany = async () => {
  await delConfirm();
};

const uploadRef = ref<InstanceType<typeof AniUpload>>();

const getIcon = (mimetype: string) => {
  if (mimetype.startsWith("image")) {
    return "icon-file-iimage";
  }
  if (mimetype.startsWith("video")) {
    return "icon-file-ivideo";
  }
  if (mimetype.startsWith("text")) {
    return "icon-file-itxt";
  }
  if (mimetype.startsWith("audio")) {
    return "icon-file-iaudio";
  }
  return "icon-file-iunknown";
};

const table = useTable({
  data: async (model, paging) => {
    return api.file.getFiles();
  },
  tableProps: {
    rowSelection: {
      showCheckedAll: true,
    },
    onSelectionChange(rowKeys) {
      selected.value = rowKeys as number[];
    },
  },
  columns: [
    {
      title: "文件名称",
      dataIndex: "name",
      render({ record }) {
        return (
          <div class="flex items-center gap-2">
            <div>
              {record.mimetype.startsWith("image") ? (
                <a-avatar size={32} shape="square">
                  <img src={record.path}></img>
                </a-avatar>
              ) : (
                <i class={`${getIcon(record.mimetype)} text-3xl mr-2`}></i>
              )}
            </div>
            <div class="flex flex-col overflow-hidden">
              <span class="hover:text-brand-500 cursor-pointer" onClick={() => preview(record)}>
                {record.name}
              </span>
              <span class="text-gray-400 text-xs truncate">{numeral(record.size).format("0 b")}</span>
            </div>
          </div>
        );
      },
    },
    createColumn,
    updateColumn,
    {
      type: "button",
      title: "操作",
      width: 120,
      buttons: [
        {
          type: "modify",
          text: "修改",
        },
        {
          type: "delete",
          text: "删除",
          onClick({ record }) {
            return api.file.delFile(record.id);
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
        label: "文件名称",
        type: "search",
        searchable: true,
        enterable: true,
        itemProps: {
          hideLabel: true,
        },
        nodeProps: {
          placeholder: "素材名称",
        },
      },
    ],
  },
  modify: {
    title: "修改素材",
    modalProps: {
      width: 580,
    },
    items: [
      {
        field: "name",
        label: "名称",
        type: "input",
      },
      {
        field: "description",
        label: "描述",
        type: "textarea",
      },
    ],
    submit: ({ model }) => {
      console.log(model);
      return api.file.setFile(model.id, model);
    },
  },
});
</script>

<style scoped></style>

<route lang="json">
{
  "meta": {
    "sort": 10304,
    "title": "素材管理",
    "icon": "icon-park-outline-movie-board"
  }
}
</route>
