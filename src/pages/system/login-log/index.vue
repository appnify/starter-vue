<template>
  <BreadPage>
    <template #content>
      <div class="p-4">
        <a-alert :closable="true" class="mb-2">
          仅展示近 90 天内的数据，如需查看更多数据，请联系管理员。
        </a-alert>
        <div class="bg-white p-4">
          <Table v-bind="table"></Table>
        </div>
      </div>
    </template>
  </BreadPage>
</template>

<script setup lang="tsx">
import { api } from "@/api";
import { Table, useTable } from "@/components";
import { dayjs } from "@/libs/dayjs";
import { Tag } from "@arco-design/web-vue";

const table = useTable({
  data: async (model, paging) => {
    return api.log.getLoginLogs({ ...model, ...paging });
  },
  columns: [
    {
      title: "登陆账号",
      dataIndex: "nickname",
      width: 140,
    },
    {
      title: "操作描述",
      dataIndex: "description",
      render: ({ record: { status, description } }) => {
        return (
          <span>
            <Tag color={status === null || status ? "green" : "red"} class="mr-2">
              {status === null || status ? "成功" : "失败"}
            </Tag>
            {description}
          </span>
        );
      },
    },
    {
      title: "登陆地址",
      dataIndex: "ip",
      width: 200,
      render: ({ record }) => `${record.addr || "未知"}(${record.ip})`,
    },
    {
      title: "操作系统",
      dataIndex: "os",
      width: 160,
    },
    {
      title: "浏览器",
      dataIndex: "browser",
      width: 160,
    },
    {
      title: "登陆时间",
      dataIndex: "createdAt",
      width: 120,
      render: ({ record }) => dayjs(record.createdAt).fromNow(),
    },
  ],
  search: {
    items: [
      {
        field: "nickname",
        label: "登陆账号",
        type: "input",
        required: false,
        nodeProps: {
          placeholder: "请输入登陆账号",
        },
        itemProps: {
          hideLabel: true,
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
    "sort": 10303,
    "title": "登陆日志",
    "icon": "icon-park-outline-log"
  }
}
</route>
