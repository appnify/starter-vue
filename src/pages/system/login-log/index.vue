<template>
  <BreadPage>
    <div class="">
      <a-alert :closable="true" class="mb-4"> 仅展示近 90 天内的数据，如需查看更多数据，请联系管理员。 </a-alert>
      <div class="">
        <Table v-bind="table"></Table>
      </div>
    </div>
  </BreadPage>
</template>

<script setup lang="tsx">
import { api } from "@/api";
import { Table, useTable } from "@/components";
import dayjs from "dayjs";

const table = useTable({
  data: async (model, paging) => {
    return api.log.getLoginLogs({ ...model, ...paging });
  },
  columns: [
    {
      title: "登陆账号",
      dataIndex: "nickname",
      width: 200,
      render({ record }) {
        return (
          <div class="flex flex-col overflow-hidden">
            <span>{record.nickname}</span>
            <span class="text-gray-400 text-xs truncate">
              {dayjs(record.createdAt).format()}
            </span>
          </div>
        );
      },
    },
    {
      title: "操作描述",
      dataIndex: "description",
      render: ({ record: { status, description } }) => {
        return (
          <span>
            <span
              class={
                status === null || status
                  ? "text-base text-green-500 icon-park-outline-check-one mr-2"
                  : "text-base text-red-500 icon-park-outline-close-one mr-2"
              }
            ></span>
            {description}
          </span>
        );
      },
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
      title: "登陆地址",
      dataIndex: "ip",
      width: 200,
      render: ({ record }) => `${record.addr || "未知"}(${record.ip})`,
    },
  ],
  search: {
    button: true,
    items: [
      {
        field: "[startDate, endDate]",
        label: "登陆账号",
        type: "dateRange",
        required: false,
        nodeProps: {
          showTime: true,
          timePickerProps: { defaultValue: ["23:59:59", "00:00:00"] },
        },
        itemProps: {
          hideLabel: true,
        },
      },
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
