<template>
  <BreadPage>
    <UserTable />
    <pass-modal></pass-modal>
  </BreadPage>
</template>

<script setup lang="tsx">
import { api } from '@/api';
import { useCreateColumn, useTable, useUpdateColumn } from '@/components/AnTable';
import { usePassworModal } from './components/password';

defineOptions({ name: 'SystemUserPage' });
const [passModal, passCtx] = usePassworModal();

const { component: UserTable } = useTable({
  source: async model => {
    return api.user.getUsers(model);
  },
  columns: [
    {
      title: '用户昵称',
      dataIndex: 'username',
      render: ({ record }) => (
        <div class="flex items-center gap-4 w-full overflow-hidden">
          <a-avatar size={32} class="!bg-brand-500">
            {record.avatar?.startsWith('/') ? <img src={record.avatar} alt="" /> : record.nickname?.[0]}
          </a-avatar>
          <div class="w-full flex-1 overflow-hidden">
            <div>
              <span>{record.nickname}</span>
              <span class="text-gray-400 text-xs truncate ml-2">@{record.username}</span>
            </div>
            <div class="w-full text-gray-400 space-x-4 text-xs">
              <span>
                <i class="icon-park-outline-mail mr-1 align-[-3px]"></i>
                contact@juetan.cn
              </span>
              <span>
                <i class="icon-park-outline-phone-telephone mr-1"></i>
                1591234568
              </span>
            </div>
          </div>
        </div>
      ),
    },
    useCreateColumn(),
    useUpdateColumn(),
    {
      title: '操作',
      type: 'button',
      width: 200,
      buttons: [
        {
          text: '重置密码',
          onClick({ record }) {
            passCtx.open(record);
          },
        },
        {
          type: 'modify',
          text: '修改',
        },
        {
          type: 'delete',
          text: '删除',
          onClick: async ({ record }) => {
            return api.user.delUser(record.id, { toast: true });
          },
        },
      ],
    },
  ],
  search: {
    hideSearch: true,
    items: [
      {
        field: 'nickname',
        label: '用户昵称',
        setter: 'input',
      },
    ],
  },
  create: {
    title: '新建用户',
    width: 820,
    formClass: '!grid grid-cols-2 gap-x-6',
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
        setterProps: {
          placeholder: '英文字母+数组组成，5~10位',
        },
      },
      {
        field: 'password',
        label: '登陆密码',
        setter: 'input',
        setterProps: {
          placeholder: '包含大小写，长度6 ~ 12位',
        },
      },
      {
        field: 'nickname',
        label: '用户昵称',
        setter: 'input',
      },
      {
        field: 'roleIds',
        label: '关联角色',
        setter: 'select',
        options: () => api.role.getRoles() as any,
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
      return api.user.addUser(model as any);
    },
  },
  modify: {
    extend: true,
    title: '修改用户',
    submit: model => {
      return api.user.setUser(model.id, model as any);
    },
  },
});
</script>

<style scoped></style>

<route lang="json">
{
  "meta": {
    "name": "SystemUserPage",
    "keepAlive": true,
    "sort": 10301,
    "title": "用户管理",
    "icon": "icon-park-outline-user"
  }
}
</route>
