<template>
  <BreadPage>
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
        field: 'name',
        label: '文件名称',
        type: 'input',
      }
    ]
  }
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
