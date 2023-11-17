<template>
  <div class="m-4 bg-white p-4">
    <div class="border-2 border-green-500 px-2 w-40 text-3xl text-green-500 mb-4">AR K056</div>
    <user-table></user-table>
    <div>{{ formatModel(emodel) }}</div>
    <UpForm />
  </div>
</template>

<script setup lang="tsx">
import { api } from '@/api';
import { formatModel, useForm } from '@/components/AnForm';
import { useTable } from '@/components/AnTable';

const { component: UserTable } = useTable({
  data(search) {
    return api.user.getUsers(search);
  },
  pagination: {
    hide: false,
  },
  columns: [
    {
      dataIndex: 'id',
      title: 'ID',
      configable: false,
    },
    {
      dataIndex: 'nickname',
      title: '用户名称',
    },
    // {
    //   dataIndex: 'description',
    //   title: '用户描述',
    // },
    {
      dataIndex: 'username',
      title: '登录账号',
    },
    {
      dataIndex: 'email',
      title: '邮箱',
    },
    {
      dataIndex: 'phone',
      title: '手机号码',
    },
    {
      dataIndex: 'createdBy',
      title: '创建人',
    },
    {
      dataIndex: 'createdAt',
      title: '创建时间',
    },
    {
      dataIndex: 'updatedBy',
      title: '更新人',
    },
    {
      dataIndex: 'updatedAt',
      title: '更新时间',
    },
    {
      title: '操作',
      type: 'button',
      width: 140,
      configable: false,
      buttons: [
        {
          text: '修改',
        },
        {
          text: '修改',
          visible: () => false,
        },
        {
          text: '修改',
          disable: () => true,
        },
      ],
    },
  ],
});

const { component: UpForm, model: emodel } = useForm({
  formProps: {
    class: 'grid! grid-cols-2 gap-x-8',
  },
  items: [
    {
      field: 'id',
      label: '输入组件',
      setter: 'input',
      setterSlots: {
        prefix: () => <span>123</span>,
      },
      itemSlots: {
        help: props => props.item.label,
        extra: () => 'extra',
      },
    },
    {
      field: 'todo',
      label: '测试',
    },
    {
      field: 'xsa',
      label: '动态渲染',
      setter: 'input',
      visible: props => props.model.id,
    },
    {
      field: 'fsa',
      label: '动态禁止',
      setter: 'input',
      disable: props => props.model.id,
    },
    {
      field: 'sgs',
      label: '校验规则',
      setter: 'input',
      // required: true,
      rules: ['email'],
    },
    {
      field: 'sgss',
      label: '动态规则',
      setter: 'input',
      rules: [
        {
          required: true,
          message: '必须项',
          disable: props => !props.model.id,
        },
      ],
    },
    {
      field: 'num',
      value: 20,
      label: '数字组件',
      setter: 'number',
    },
    {
      field: 'date',
      label: '日期组件',
      setter: 'date',
    },
    {
      field: '[startDate,endDate]',
      label: '字段语法',
      setter: 'dateRange',
    },
    {
      field: '{value,dd}',
      value: { value: 1 },
      label: '下拉组件',
      setter: 'select',
      options: [
        {
          label: '测试',
          value: {
            value: 1,
            dd: 123,
          },
        },
        {
          label: '测试2',
          value: {
            value: 2,
            dd: 223,
          },
        },
      ],
      setterProps: {
        valueKey: 'value',
      },
    },
  ],
  async submit(model) {
    return { message: '操作成功' };
  },
});
</script>

<style scoped></style>

<route lang="json">
{
  "meta": {
    "sort": 10001,
    "title": "概览",
    "icon": "icon-park-outline-home"
  }
}
</route>
@/components/AnForm/components/useFormModel
