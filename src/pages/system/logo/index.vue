<template>
  <BreadPage>
    <OperationTable></OperationTable>
  </BreadPage>
</template>

<script setup lang="tsx">
import { api } from '@/api';
import { useTable } from '@/components/AnTable';
import { dayjs } from '@/libs/dayjs';
import { Tag } from '@arco-design/web-vue';

defineOptions({ name: 'SystemLogoPage' });

const { component: OperationTable } = useTable({
  columns: [
    {
      title: '登陆账号',
      dataIndex: 'nickname',
      width: 140,
    },
    {
      title: '操作描述',
      dataIndex: 'description',
      render: ({ record: { status, description } }) => {
        return (
          <span>
            <Tag color={status === null || status ? 'green' : 'red'} class="mr-2">
              {status === null || status ? '成功' : '失败'}
            </Tag>
            {description}
          </span>
        );
      },
    },
    {
      title: '登陆地址',
      dataIndex: 'ip',
      width: 200,
      render: ({ record }) => `${record.addr || '未知'}(${record.ip})`,
    },
    {
      title: '操作系统',
      dataIndex: 'os',
      width: 160,
    },
    {
      title: '浏览器',
      dataIndex: 'browser',
      width: 160,
    },
    {
      title: '登陆时间',
      dataIndex: 'createdAt',
      width: 120,
      render: ({ record }) => dayjs(record.createdAt).fromNow(),
    },
  ],
  source: model => api.log.getLoginLogs(model),
  search: [
    {
      field: 'nickname',
      label: '登陆账号',
      setter: 'input',
      required: false,
    },
  ],
});
</script>

<style scoped></style>

<route lang="json">
{
  "meta": {
    "name": "SystemLogoPage",
    "sort": 10304,
    "title": "操作日志",
    "icon": "icon-park-outline-doc-detail"
  }
}
</route>
