<template>
  <div class="m-4 bg-white p-4">
    <div class="border-2 border-green-500 px-2 w-40 text-3xl text-green-500 mb-4">AR K056</div>
    <TestForm></TestForm>
    <div>{{ formatModel(model) }}</div>
  </div>
</template>

<script setup lang="tsx">
import { useFormModal } from "@/components/AnForm/hooks/useFormModal";
import { formatModel } from "@/components/form/core/useFormModel";
import { sleep } from "@/utils";

const { component: TestForm, model } = useFormModal({
  trigger: true,
  modalProps: {
    width: 880
  },
  formProps: {
    class: 'grid! grid-cols-2 gap-x-4'
  },
  items: [
    {
      field: "id",
      label: "输入组件",
      setter: "input",
    },
    {
      field: "xsa",
      label: "动态渲染",
      setter: "input",
      visible: (model) => model.id,
    },
    {
      field: "fsa",
      label: "动态禁止",
      setter: "input",
      disable: (model) => model.id,
    },
    {
      field: "sgs",
      label: "校验规则",
      setter: "input",
      required: true,
      rules: ["email"],
    },
    {
      field: "sgss",
      label: "动态规则",
      setter: "input",
      rules: [
        {
          required: true,
          message: "必须项",
          disable: (model) => !model.id,
        },
      ],
    },
    {
      field: "num",
      value: 20,
      label: "数字组件",
      setter: "number",
    },
    {
      field: "date",
      label: "日期组件",
      setter: "date",
    },
    {
      field: "[startDate, endDate]",
      label: "字段语法",
      setter: "dateRange",
    },
    {
      field: "tod",
      value: 1,
      label: "下拉组件",
      setter: "select",
      options: [
        {
          label: "测试",
          value: 1,
        },
      ],
    },
  ],
  async submit(model) {
    await sleep(3000);
    return { message: "操作成功" };
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
