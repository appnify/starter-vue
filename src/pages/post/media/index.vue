<template>
  <BreadPage>
    <div class="min-h-full grid grid-cols-[auto_auto_1fr]">
      <div class="w-[220px]">
        <!-- <div class="h-6 flex items-end justify-between gap-2">
          <div class="text-base">
            素材分组
          </div>
          <div>
            <a-link>添加</a-link>
          </div>
        </div> -->
        <!-- <a-divider :margin="12"></a-divider> -->
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
          class="group flex items-center justify-between gap-2 h-8 rounded mb-1 pl-2 hover:bg-gray-100 cursor-pointer">
          <div>
            <i class="icon-file-folder"></i>
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

const table = useTable({
  data: async (model, paging) => {
    return api.upload.getUploads();
  },
  columns: [
    {
      title: "文件名称",
      dataIndex: "name",
      width: 260,
    },
    {
      title: "操作描述",
      dataIndex: "description",
    },
    {
      title: "登陆时间",
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
    items: [
      {
        field: "name",
        label: "文件名称",
        type: "input",
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
