<template>
  <BreadPage>
    <Table v-bind="table">
      <template #action>
        <a-button type="primary" @click="visible = true">添加</a-button>
        <ani-editor v-model:visible="visible"></ani-editor>
      </template>
    </Table>
  </BreadPage>
</template>

<script setup lang="tsx">
import { api } from "@/api";
import { Table, useTable } from "@/components";
import aniEditor from "@/components/editor/index.vue";
import dayjs from "dayjs";

const visible = ref(false);
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
            <span class="text-gray-400 text-xs truncate">{dayjs(record.createdAt).format()}</span>
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
      title: "登陆地址",
      dataIndex: "ip",
      width: 200,
      render({ record }) {
        return (
          <div class="flex flex-col overflow-hidden">
            <span>{record.addr || "未知"}</span>
            <span class="text-gray-400 text-xs truncate">{record.ip}</span>
          </div>
        );
      },
    },
    {
      title: "操作系统",
      dataIndex: "os",
      width: 200,
      render({ record }) {
        const [os, version] = record.os.split(" ");
        return (
          <div class="flex flex-col overflow-hidden">
            <span>{os || "未知"}</span>
            <span class="text-gray-400 text-xs truncate">{version}</span>
          </div>
        );
      },
    },
    {
      title: "浏览器",
      dataIndex: "browser",
      width: 200,
      render({ record }) {
        const [browser, version] = record.browser.split(" ");
        return (
          <div class="flex flex-col overflow-hidden">
            <span>{browser || "未知"}</span>
            <span class="text-gray-400 text-xs truncate">v{version}</span>
          </div>
        );
      },
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
