<template>
  <div class="m-4 bg-white p-4">
    <div class="border-2 border-green-500 px-2 w-40 text-3xl text-green-500 mb-4">AR K056</div>
    <div>{{ formatModel(emodel) }}</div>
    <UpForm />
  </div>
</template>

<script setup lang="tsx">
import { useForm } from '@/components/AnForm';
import { formatModel } from '@/components/AnForm/core/useFormModel';

const { component: UpForm, model: emodel } = useForm({
  formProps: {
    class: 'grid! grid-cols-2 gap-x-8',
  },
  items: [
    {
      field: 'id',
      label: '输入组件',
      setter: 'input',
      itemSlots: {
        help(props) {
          return props.item.label;
        },
      },
    },
    {
      field: 'xsa',
      label: '动态渲染',
      setter: 'cascader',
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
      // rules: ["email"],
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
