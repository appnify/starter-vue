<template>
  <div class="m-4 p-4 bg-white">
    <Table v-bind="table">
      <template #action>
        <a-button @click="model.visible = true">
          <template #icon>
            <i class="icon-park-outline-download"></i>
          </template>
          导出
        </a-button>
        <a-button @click="model.visible = true">
          <template #icon>
            <i class="icon-park-outline-upload"></i>
          </template>
          导入
        </a-button>
      </template>
    </Table>
    <a-modal title="导出为文件" v-model:visible="model.visible" title-align="start">
      <a-form :model="{}" layout="vertical" class="export-form">
        <a-form-item label="文件名">
          <a-input v-model="model.filename" placeholder="请输入"></a-input>
        </a-form-item>
        <a-form-item label="导出类型">
          <div class="grid gap-2">
            <div
              v-for="item in exportTypes"
              @click="model.exportType = item.name"
              class="w-full flex justify-between items-center gap-4 rounded py-2 px-4 border cursor-pointer border-slate-200"
              :class="{
                '!border-brand-500': model.exportType === item.name,
              }"
            >
              <div class="flex items-center gap-2 rounded">
                <div class="h-10 w-10 flex items-center justify-center rounded-full bg-brand-50">
                  <i :class="item.icon" class="text-2xl text-brand-500"></i>
                </div>
                <div>
                  <div class="text-slate-900">
                    {{ item.label }}
                  </div>
                  <div class="text-slate-400 text-xs">
                    {{ item.description }}
                  </div>
                </div>
              </div>
              <div>
                <a-radio v-model="model.exportType" :value="item.name" class="mt-1"></a-radio>
              </div>
            </div>
          </div>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal title="导入文件" :visible="false" title-align="start">
      <a-alert> 请按照 <a-link>上传模板</a-link> 中的格式进行填写，上传文件后系统将自动导入数据 </a-alert>
      <a-upload draggable class="mt-4"></a-upload>
    </a-modal>
  </div>
</template>

<script setup lang="tsx" name="PostPage">
import { api } from "@/api";
import { Table, useTable } from "@/components";
import { dayjs } from "@/libs";

const table = useTable({
  data: async (model, paging) => {
    return api.post.getPosts({ ...model, ...paging });
  },
  columns: [
    {
      type: "index",
    },
    {
      title: "文章名称",
      dataIndex: "title",
      width: 200,
    },
    {
      title: "文章描述",
      dataIndex: "description",
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      width: 200,
      render: ({ record }) => dayjs(record.createdAt).format(),
    },
    {
      title: "操作",
      type: "dropdown",
      width: 140,
      dropdowns: [
        {
          type: "modify",
          text: "修改",
          icon: "icon-park-outline-edit",
        },
        {
          type: "delete",
          text: "删除",
          icon: "icon-park-outline-delete",
          onClick: ({ record }) => {
            return api.post.delPost(record.id);
          },
          doptionProps: {
            class: "!text-red-500 !hover-bg-red-50",
          },
        },
      ],
    },
  ],
  search: {
    items: [
      {
        extend: "title",
        required: false,
      },
      {
        extend: "title",
        required: false,
      },
      {
        extend: "title",
        required: false,
      },
      {
        extend: "title",
        required: false,
      },
      {
        extend: "title",
        required: false,
      },
    ],
  },
  create: {
    title: "新建文章",
    modalProps: {
      width: 580,
      maskClosable: false,
    },
    formProps: {
      layout: "vertical",
    },
    items: [
      {
        field: "title",
        label: "文章名称",
        type: "input",
        required: true,
      },
      {
        field: "slug",
        label: "文章标识",
        type: "input",
      },
      {
        field: "description",
        label: "文章描述",
        type: "input",
      },
      {
        field: "content",
        label: "文章内容",
        type: "textarea",
      },
    ],
    submit: ({ model }) => {
      return api.post.addPost(model);
    },
  },
  modify: {
    extend: true,
    title: "修改文章",
    submit: ({ model }) => {
      return api.post.updatePost(model.id, model);
    },
  },
});

const exportTypes = [
  {
    name: "excel",
    icon: "icon-park-outline-file-excel",
    label: "Excel格式",
    description: "后缀: .xlsx, 可使用 office excel 2003 及以上版本打开",
  },
  {
    name: "csv",
    icon: "icon-park-outline-file-code",
    label: "CSV格式",
    description: "后缀: .csv, 可使用 excel 或 记事本等工具打开",
  },
  {
    name: "text",
    icon: "icon-park-outline-file-text",
    label: "TEXT格式",
    description: "后缀: .txt, 可使用 记事本 或 其他文本编辑器打开",
  },
];

const model = reactive({
  visible: false,
  exportType: "excel",
  filename: dayjs().format("导出文件YYYYMMDDHHmmss"),
});
</script>

<style lang="less">
.export-form {
  .arco-form-item-content {
    display: block;
  }
}
</style>

<route lang="json">
{
  "meta": {
    "sort": 10300,
    "title": "文章管理",
    "icon": "icon-park-outline-document-folder"
  },
  "parentMeta": {
    "sort": 10300,
    "title": "内容管理",
    "icon": "icon-park-outline-document-folder"
  }
}
</route>
