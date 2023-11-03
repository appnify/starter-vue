<template>
  <BreadPage>
    <div class="overflow-hidden h-full grid grid-cols-[auto_1fr] gap-4">
      <ani-group :current="current" @change="onCategoryChange"></ani-group>
      <div>
        <file-table>
          <template #action>
            <ani-upload @close="onUploadClose"></ani-upload>
            <a-button type="primary" status="danger" :disabled="!selected.length" @click="onDeleteMany">
              批量删除
            </a-button>
          </template>
        </file-table>
        <a-image-preview v-model:visible="visible" :src="image"></a-image-preview>
      </div>
    </div>
  </BreadPage>
</template>

<script setup lang="tsx">
import { FileCategory, api } from "@/api";
import { createColumn, updateColumn, useAniTable } from "@/components";
import { delConfirm } from "@/utils";
import { Message } from "@arco-design/web-vue";
import numeral from "numeral";
import AniGroup from "./components/group.vue";
import AniUpload from "./components/upload.vue";
import { getIcon } from "./components/util";

const visible = ref(false);
const image = ref("");
const selected = ref<number[]>([]);
const current = ref<FileCategory>();
const preview = (record: any) => {
  if (!record.mimetype.startsWith("image")) {
    window.open(record.path, "_blank");
    return;
  }
  image.value = record.path;
  visible.value = true;
};

const onUploadClose = (count: number) => {
  if (count) {
    fileCtx.refresh();
  }
};

const onDeleteMany = async () => {
  await delConfirm();
  const res = await api.file.delFiles(selected.value as any[]);
  selected.value = [];
  Message.success(res.data.message);
  fileCtx.refresh();
};

const onCategoryChange = (category: FileCategory) => {
  if (fileCtx.props.search?.model) {
    fileCtx.props.search.model.categoryId = category.id;
  }
  current.value = category;
  fileCtx.refresh();
};

const [fileTable, fileCtx] = useAniTable({
  data: async (model, paging) => {
    return api.file.getFiles({ ...model, ...paging });
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
      render: ({ record }) => (
        <div class="flex items-center gap-2">
          <div class="w-8 flex justify-center">
            {record.mimetype.startsWith("image") ? (
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
              {numeral(record.size).format("0 b")}
              <span class="ml-2">{record.category?.name}</span>
            </span>
          </div>
        </div>
      ),
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
    model: {
      categoryId: undefined,
    },
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
        field: "categoryId",
        label: "分类",
        type: "select",
        options: () => api.fileCategory.getFileCategorys({ size: 0 }),
      },
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
    "sort": 10305,
    "title": "素材管理",
    "icon": "icon-park-outline-movie-board"
  }
}
</route>
