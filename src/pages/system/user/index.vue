<template>
  <BreadPage>
    <Table v-bind="table"> </Table>
    <pass-modal></pass-modal>
  </BreadPage>
</template>

<script setup lang="tsx">
import { api } from "@/api";
import { Table, createColumn, updateColumn, useTable } from "@/components";
import InputAvatar from "./components/avatar.vue";
import { usePassworModal } from "./components/password";

const [passModal, passCtx] = usePassworModal();

const table = useTable({
  data: async (model, paging) => {
    return api.user.getUsers({ ...model, ...paging });
  },
  columns: [
    {
      title: "用户昵称",
      dataIndex: "username",
      width: 180,
      render: ({ record }) => (
        <div class="flex items-center">
          <a-avatar size={32}>
            {record.avatar?.startsWith("/") ? <img src={record.avatar} alt="" /> : record.nickname?.[0]}
          </a-avatar>
          <span class="ml-2 flex-1 flex flex-col overflow-hidden">
            <span>{record.nickname}</span>
            <span class="text-gray-400 text-xs truncate">@{record.username}</span>
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
      width: 200,
    },
    createColumn,
    updateColumn,
    {
      title: "操作",
      type: "button",
      width: 180,
      buttons: [
        {
          type: "modify",
          text: "修改",
        },
        {
          text: "设置密码",
          onClick({ record }) {
            passCtx.open(record);
          },
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
    button: true,
    items: [
      {
        field: "nickname",
        label: "用户昵称",
        type: "search",
        searchable: true,
        enterable: true,
        itemProps: {
          hideLabel: true,
        },
        nodeProps: {
          placeholder: "用户昵称",
        },
      },
    ],
  },
  create: {
    title: "新建用户",
    modalProps: {
      width: 732,
      maskClosable: false,
    },
    formProps: {
      layout: "vertical",
      class: "!grid grid-cols-2 gap-x-6",
    },
    model: {},
    items: [
      {
        field: "avatar",
        label: "用户头像",
        type: "custom",
        itemProps: {
          class: "col-span-2",
        },
        component({ model }) {
          return <InputAvatar v-model={model.avatar}></InputAvatar>;
        },
      },
      {
        field: "username",
        label: "登录账号",
        type: "input",
        required: true,
        nodeProps: {
          placeholder: "英文字母+数组组成，5~10位",
        },
      },
      {
        field: "password",
        label: "登陆密码",
        type: "input",
        nodeProps: {
          placeholder: "包含大小写，长度6 ~ 12位",
        },
      },
      {
        field: "nickname",
        label: "用户昵称",
        type: "input",
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
        field: "description",
        label: "个人描述",
        type: "textarea",
        itemProps: {
          class: "col-span-2",
        },
        nodeProps: {
          class: "h-[96px]",
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
      return api.user.setUser(model.id, model);
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
