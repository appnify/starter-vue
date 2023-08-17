<template>
  <BreadPage>
    <template #content>
      <a-tabs default-active-key="1" size="large" class="bg-white m-4">
        <a-tab-pane key="1" title="全部">
          <Table v-bind="table" class="px-4 pb-4"></Table>
        </a-tab-pane>
        <a-tab-pane key="2" title="已通过(12)"></a-tab-pane>
      </a-tabs>
    </template>
  </BreadPage>
</template>

<script setup lang="tsx">
import { api } from "@/api";
import { Table, useTable } from "@/components";
import { dayjs } from "@/plugins";
import { Avatar, Button } from "@arco-design/web-vue";

const table = useTable({
  data: async (model, paging) => {
    return api.user.getUsers({ ...model, ...paging });
  },
  columns: [
    {
      title: "用户昵称",
      dataIndex: "username",
      width: 200,
      render: ({ record }) => (
        <div class="flex items-center">
          <Avatar size={32}>
            <img src={record.avatar} alt="" />
          </Avatar>
          <span class="ml-2 flex-1 flex flex-col overflow-hidden">
            <span>{record.nickname}</span>
            <span class="text-gray-400 text-xs truncate">{record.username}</span>
          </span>
        </div>
      ),
    },
    {
      title: "用户描述",
      dataIndex: "description",
    },
    {
      title: "用户邮箱",
      dataIndex: "email",
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      width: 200,
      render: ({ record }) => dayjs(record.createdAt).format(),
    },
    {
      title: "操作",
      type: "button",
      width: 148,
      buttons: [
        {
          type: "modify",
          text: "修改",
        },
        {
          type: "delete",
          text: "删除",
          onClick: async ({ record }) => {
            return api.user.delUser(record.id, { toast: true });
          },
        },
      ],
    },
  ],
  search: {
    items: [
      {
        extend: "nickname",
        required: false,
        itemProps: {
          hideLabel: true,
        },
        nodeProps: {
          placeholder: "输入用户昵称关键字",
        },
      },
    ],
  },
  create: {
    title: "新建用户",
    trigger: () => (
      <Button type="primary">
        {{
          icon: () => <i class="icon-park-outline-people-plus-one" />,
          default: () => "添加",
        }}
      </Button>
    ),
    modalProps: {
      width: 772,
      maskClosable: false,
    },
    formProps: {
      layout: "vertical",
      class: "!grid grid-cols-2 gap-x-6",
    },
    items: [
      {
        field: "username",
        label: "登录账号",
        type: "input",
        required: true,
      },
      {
        field: "nickname",
        label: "用户昵称",
        type: "input",
      },
      {
        field: "description",
        label: "个人描述",
        type: "textarea",
        itemProps: {
          class: 'col-span-2'
        }
      },
      {
        field: "password",
        label: "密码",
        type: "password",
      },
      {
        field: "roleIds",
        label: "关联角色",
        type: "select",
        options: () => api.role.getRoles(),
        nodeProps: {
          multiple: true,
        },
      },
      {
        label: "头像",
        field: "avatarId",
        type: "custom",
        component: ({ field, model }) => {
          return (
            <Avatar size={40}>
              <img src={model?.[field]} alt="" />
            </Avatar>
          );
        },
      },
    ],
    submit: ({ model }) => {
      return api.user.addUser(model);
    },
  },
  modify: {
    extend: true,
    title: "修改用户",
    submit: ({ model }) => {
      return api.user.updateUser(model.id, model);
    },
  },
});
</script>

<style scoped></style>

<route lang="json">
{
  "meta": {
    "sort": 10301,
    "title": "用户管理",
    "icon": "icon-park-outline-user"
  }
}
</route>
