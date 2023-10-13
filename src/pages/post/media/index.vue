<template>
  <BreadPage>
    <div class="min-h-full grid grid-cols-[auto_auto_1fr]">
      <div class="w-[200px]">
        <div class="flex gap-2">
          <a-input-search allow-clear placeholder="分组名称..." class="mb-2"></a-input-search>
          <a-button>
            <template #icon>
              <i class="icon-park-outline-add"></i>
            </template>
          </a-button>
        </div>
        <li
          v-for="i in 10"
          class="group flex items-center justify-between gap-2 h-8 rounded mb-2 pl-3 hover:bg-gray-100 cursor-pointer"
        >
          <div>
            <i class="icon-file-folder text-gray-600"></i>
            日常素材
            <span class="text-xs text-gray-400">(10)</span>
          </div>
          <div>
            <a-button size="small" type="text" class="!hidden !group-hover:inline-block">
              <template #icon>
                <i class="icon-park-outline-more-one text-gray-400 hover:text-gray-700"></i>
              </template>
            </a-button>
          </div>
        </li>
      </div>
      <a-divider direction="vertical" :margin="16"></a-divider>
      <div>
        <Table v-bind="table">
          <template #action>
            <a-button type="primary">
              <template #icon>
                <i class="icon-park-outline-upload"></i>
              </template>
              上传
            </a-button>
          </template>
        </Table>
      </div>
    </div>
  </BreadPage>
</template>

<script setup lang="tsx">
import { api } from "@/api";
import { Table, useTable } from "@/components";
import { dayjs } from "@/libs/dayjs";
import numeral from "numeral";

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
    return api.upload.getUploads();
  },
  columns: [
    {
      title: "文件名称",
      dataIndex: "name",
      render: ({ record }) => {
        return (
          <div class="flex items-center">
            <i class={`${getIcon(record.mimetype)} text-xl mr-2`}></i>
            {record.name}
          </div>
        );
      },
    },
    {
      title: "大小",
      dataIndex: "description",
      width: 120,
      render: ({ record }) => numeral(record.size).format("0 b"),
    },
    {
      title: "上传时间",
      dataIndex: "createdAt",
      width: 200,
      render: ({ record }) => dayjs(record.createdAt).format(),
    },
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
            return api.upload.delFile(record.id);
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
        enableLoad: true,
        itemProps: {
          hideLabel: true,
        },
        nodeProps: {
          placeholder: "素材名称...",
        },
      },
    ],
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
