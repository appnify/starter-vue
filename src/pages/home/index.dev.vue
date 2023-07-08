<template>
  <div class="m-4 p-4 bg-white">
    <Form v-bind="form"></Form>
  </div>
</template>

<script setup lang="tsx">
import { Form, useForm } from "@/components";

const sleep = (wait: number) => new Promise((res) => setTimeout(res, wait));

const form = useForm({
  items: [
    {
      field: "username",
      label: "姓名",
      type: "input",
      required: true,
      itemProps: {
        hideLabel: false,
      },
      rules: ["password"],
    },
    {
      field: "nickname",
      label: "昵称",
      type: "input",
      disable: ({ model }) => !model.username,
      rules: [
        {
          message: "昵称不能超过 10 个字符",
          required: true,
          disable: ({ model }) => !model.username,
        },
      ],
    },
    {
      field: "password",
      label: "密码",
      type: "password",
      visible: ({ model }) => model.username,
      nodeProps: {
        class: "w-full",
      },
    },
    {
      field: "gender",
      label: "性别",
      type: "select",
      options: [
        {
          label: "男",
          value: 1,
        },
        {
          label: "女",
          value: 2,
        },
      ],
    },
    {
      field: "startTime:endTime",
      label: "时间",
      type: "time",
      nodeProps: {
        type: "time-range",
      },
      help: "时间段",
    },
    {
      field: "startDate:endDate",
      label: "日期",
      type: "dateRange",
    },
    {
      field: "checkbox",
      label: "多选",
      type: "checkbox",
      options: [
        {
          label: "选项1",
          value: 1,
        },
        {
          label: "选项2",
          value: 2,
        },
      ],
    },
    {
      field: "radio",
      label: "单选",
      type: "radio",
      options: [
        {
          label: "选项1",
          value: 1,
        },
        {
          label: "选项2",
          value: 2,
        },
      ],
    },
    {
      field: "slider",
      label: "音量",
      type: "slider",
    },
    {
      field: "provice:city:town",
      label: "城市",
      type: "cascader",
      nodeProps: {
        checkStrictly: true,
        pathMode: true,
      },
      options: [
        {
          label: "广西",
          value: "gx",
          children: [
            {
              label: "南宁",
              value: "nn",
            },
            {
              label: "桂林",
              value: "gl",
              children: [
                {
                  label: "阳朔",
                  value: "ys",
                },
                {
                  label: "临桂",
                  value: "lg",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  submit: async ({ model }) => {
    await sleep(3000);
    console.log("submit", model);
    return { message: "操作成功" };
  },
});
</script>

<style scoped></style>

<route lang="json">
{
  "meta": {
    "sort": 10101,
    "title": "首页111",
    "icon": "icon-park-outline-home"
  }
}
</route>
