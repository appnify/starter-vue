<template>
  <BreadPage>
    <Table v-bind="table"></Table>
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
      width: 200,
    },
    {
      title: "操作描述",
      dataIndex: "description",
      render: ({ record: { status, description } }) => {
        return (
          <span>
            <Tag color={status === null || status ? "green" : "red"} class="mr-2">
              { status === null || status ? "成功" : "失败" }
            </Tag>
            {description}
          </span>
        );
      },
    },
    {
      title: "登陆地址",
      dataIndex: "ip",
      render: ({ record }) => `${record.addr || "未知"}(${record.ip})`,
    },
    {
      title: "操作系统",
      dataIndex: "os",
    },
    {
      title: "浏览器",
      dataIndex: "browser",
    },
    {
      title: "登陆时间",
      dataIndex: "createdAt",
      width: 200,
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
          placeholder: '请输入登陆账号',
          hideLabel: true,
        }
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
