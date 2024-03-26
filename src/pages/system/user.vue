<template>
  <AnPage>
    <UserTable />
    <PasswordModal></PasswordModal>
  </AnPage>
</template>

<script setup lang="tsx">
import { getRoles } from '@/api/Role';
import { addUser, delUser, updateUser } from '@/api/User';
import { TableColumnRender, useFormModal, useTable } from 'arconify';

defineOptions({
  name: 'SystemUserPage',
});

definePage({
  meta: {
    title: '用户管理',
    componentName: 'SystemUserPage',
    sort: 10301,
    icon: 'i-icon-park-outline-user',
  },
});

const PasswordModal = useFormModal({
  trigger: false,
  modalProps: {
    title: '重置密码',
    width: 432,
  },
  model: {
    id: undefined,
    nickname: undefined,
  },
  items: [
    {
      field: 'password',
      label: '新密码',
      setter: 'input',
    },
  ],
  submit: model => updateUser(model.id, model as any),
});

const usernameRender: TableColumnRender = ({ record }) => (
  <div class="flex items-center gap-4 w-full overflow-hidden">
    <a-avatar size={32} class="bg-brand-500!">
      {record.avatar?.startsWith('/') ? <img src={record.avatar} alt="" /> : record.nickname?.[0]}
    </a-avatar>
    <div class="w-full flex-1 overflow-hidden">
      <div>
        <span class="cursor-pointer ">{record.nickname}</span>
      </div>
    </div>
  </div>
);

const UserTable = useTable({
  columns: [
    {
      title: '用户昵称',
      dataIndex: 'username',
      render: usernameRender,
    },
    {
      title: '创建',
      render: () => '3 天前',
    },
    // {
    //   ...useCreateColumn(),
    // },
    // {
    //   ...useUpdateColumn(),
    // },
    {
      title: '操作',
      type: 'button',
      width: 200,
      align: 'right',
      buttons: [
        {
          text: '重置密码',
          onClick: ({ record }) => open(record),
        },
        {
          type: 'modify',
          text: '修改',
        },
        {
          type: 'delete',
          text: '删除',
          onClick: async ({ record }) => {
            return delUser(record.id, { toast: true });
          },
        },
      ],
    },
  ],
  data: model => {
    return [];
  },
  search: [
    {
      field: 'nickname',
      label: '用户昵称',
      setter: 'search',
    },
  ],
  create: {
    modalProps: {
      title: '新建用户',
      width: 820,
    },
    formProps: {
      class: '!grid grid-cols-2 gap-x-6',
    },
    items: [
      {
        field: 'avatar',
        label: '用户头像',
        setter: 'input',
        setterProps: {
          class: 'col-span-2',
        },
      },
      {
        field: 'username',
        label: '登录账号',
        setter: 'input',
        required: true,
        placeholder: '英文字母+数组组成，5~10位',
      },
      // {
      //   field: 'password',
      //   label: '登陆密码',
      //   setter: 'input',
      //   placeholder: '包含大小写，长度6 ~ 12位',
      // },
      {
        field: 'nickname',
        label: '用户昵称',
        setter: 'input',
      },
      {
        field: 'roleIds',
        label: '关联角色',
        setter: 'select',
        options: () => getRoles() as any,
        setterProps: {
          multiple: true,
        },
      },
      {
        field: 'description',
        label: '个人描述',
        setter: 'textarea',
        itemProps: {
          class: 'col-span-2',
        },
        setterProps: {
          class: 'h-[96px]',
        },
      },
    ],
    submit: model => {
      return addUser(model as any);
    },
  },
  modify: {
    extend: true,
    submit: model => {
      return updateUser(model.id, model as any);
    },
  },
});
</script>

<style scoped></style>
