<template>
  <div class="m-4 p-4 bg-white">
    <Table v-bind="table"></Table>
  </div>
</template>

<script setup lang="tsx">
import { ContentType, api } from "@/api";
import { Table, useTable } from "@/components";
import { dayjs } from "@/plugins";
import { Avatar } from "@arco-design/web-vue";

const url = ref<any>(null);

const table = useTable({
  data: async () => {
    return [];
  },
  columns: [
    // {
    //   type: 'index'
    // },
    {
      title: "姓名",
      dataIndex: "username",
      width: 200,
      render: ({ record }) => {
        return (
          <div class="flex items-center gap-2 w-full">
            <div>
              <Avatar size={32}>
                <img src={record.avatar} width={32} height={32} />
              </Avatar>
            </div>
            <div class="flex-1 overflow-hidden">
              <span class="ml-0">{record.nickname}</span>
              <div class="text-xs text-gray-400 mt-1 truncate">{record.description}</div>
            </div>
          </div>
        );
      },
    },
    {
      title: "昵称",
      dataIndex: "username",
    },
    {
      title: "昵称",
      dataIndex: "username",
      width: 200,
      render: ({ record }) => {
        return (
          <div class="">
            <span class="ml-0">{record.username}</span>
            <div class="text-xs text-gray-400 mt-1 truncate">创建于 {dayjs(record.createAt).format()}</div>
          </div>
        );
      },
    },
    {
      title: "操作",
      type: "button",
      width: 70,
      buttons: [],
    },
  ],
  common: {
    modalProps: {
      width: 432,
      maskClosable: false,
    },
    formProps: {
      layout: "vertical",
    },
    model: {
      avatar: "11",
    },
    items: [
      {
        field: "username",
        label: "姓名",
        type: "input",
        required: true,
      },
      {
        field: "nickname",
        label: "昵称",
        type: "input",
      },
      {
        field: "password",
        label: "密码",
        type: "password",
      },
      {
        label: "头像",
        field: "avatar",
        type: "input",
        component: ({ model, field }) => {
          const onInputChange = (e: Event) => {
            const target = e.target as HTMLInputElement;
            const file = target.files?.[0];
            if (!file) {
              return;
            }
            model[field] = file;
            console.log(file);
            const reader = new FileReader();
            reader.onload = (e) => {
              url.value = e.target?.result;
            };
            reader.readAsDataURL(file);
          };
          return (
            <div class="w-full h-12 flex gap-4 items-center justify-between">
              <input type="file" onChange={onInputChange} class="flex-1" />
              {url.value && (
                <a-avatar size={40}>
                  <img src={url.value} />
                </a-avatar>
              )}
            </div>
          );
        },
      },
    ],
  },
  search: {
    items: [
      {
        field: "username",
        label: "姓名",
        type: "input",
      },
    ],
  },
  create: {
    title: "新建用户",
    submit: ({ model }) => {
      return api.user.createUser(model, {
        type: ContentType.FormData,
      });
    },
  },
  modify: {
    title: "修改用户",
  },
});
</script>

<style scoped></style>

<route lang="json">
{
  "meta": {
    "sort": 10101,
    "title": "首页",
    "icon": "icon-park-outline-home"
  }
}
</route>
