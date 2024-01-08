<template>
  <BreadPage>
    <OperationTable></OperationTable>
  </BreadPage>
</template>

<script setup lang="tsx">
import { useTable } from '@/components/AnTable';
import { Image } from '@arco-design/web-vue';

const data: any = []
defineOptions({ name: 'SystemLogoPage' });

const { component: OperationTable } = useTable({
  columns: [
    {
      title: '标题',
      dataIndex: 'title',
      width: 140,
      render: ({ record }) => {
        return (
          <div class="flex gap-2">
            <div>
              <Image width={188} src={record['cover-src']}></Image>
            </div>
            <div>
              <div>
                <a-link href={record['title-href']} target="_blank">
                  { record.title }
                </a-link>
              </div>
              <div>
                <a-link href={record['user-href']}>{record.user}</a-link>
              </div>
            </div>
          </div>
        )
      }
    },
  ],
  source: model => {
    return data;
  },
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
