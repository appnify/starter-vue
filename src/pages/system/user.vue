<template>
  <AnPage>
    <DeForm ref="deRef" />
    <a-button @click="show1 = !show1">显示字段1</a-button>
    <a-button @click="required1 = !required1">是否必填</a-button>
  </AnPage>
</template>

<script setup lang="tsx">
import { getRoles } from '@/api/Role'
import { addUser, delUser, getUsers, updateUser } from '@/api/User'
import { useFormModal, useTable } from 'arconify'

const show1 = ref(false)
const required1 = ref(false)

defineOptions({
  name: 'SystemUserPage',
})

definePage({
  meta: {
    title: '用户管理',
    icon: 'i-icon-park-outline-user',
    componentName: 'SystemUserPage',
    sort: 10301,
    auth: 'system_user_page',
  },
})

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
})

const usernameRender = ({ record }) => (
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
)

const UserTable = useTable({
  data: async params => {
    const { data } = await getUsers(params)
    return data as any
  },
  columns: [
    {
      type: 'index',
    },
    {
      title: '用户昵称',
      dataIndex: 'username',
      render: usernameRender,
    },
    {
      title: '创建',
      render: () => '3 天前',
    },
    {
      title: '操作',
      type: 'button',
      width: 200,
      align: 'right',
      buttons: [
        {
          text: '重置密码',
          // onClick: ({ record }) => open(record),
        },
        {
          type: 'modify',
          text: '修改',
        },
        {
          text: '删除',
          type: 'delete',
          onClick: async ({ record }) => {
            return delUser(record.id, { toast: true })
          },
        },
      ],
    },
  ],
  actions: [
    {
      text: '删除',
      type: 'selection',
      position: 'aside',
      icon: 'i-icon-park-outline-delete',
      status: 'danger',
      onClick: (...args) => {
        console.log(args)
      },
    },
    {
      type: 'refresh',
    },
  ],
  search: {
    formProps: {
      layout: 'horizontal',
      class: 'grid! grid-cols-4 gap-4',
    },
    items: [
      {
        field: 'nickname',
        label: '用户昵称',
        setter: 'search',
      },
      {
        field: 'nickname1',
        label: '用户昵称1',
        setter: 'search',
      },
    ],
  },
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
        setterProps: {
          multiple: true,
        },
        options: () => getRoles() as any,
      },
      {
        field: 'description',
        label: '个人描述',
        setter: 'textarea',
        setterProps: {
          class: 'h-[96px]',
        },
        itemProps: {
          class: 'col-span-2',
        },
      },
    ],
    submit: model => {
      return addUser(model as any)
    },
  },
  modify: {
    extend: true,
    submit: model => {
      return updateUser(model.id, model as any)
    },
  },
})
</script>

<style scoped></style>
