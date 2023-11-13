<template>
  <div class="m-4">
    <div class="border-2 border-green-500 px-2 w-40 text-3xl text-green-500">AR K056</div>
    <AnForm :model="model" :items="items" :submit="submit" :form-props="formProps"></AnForm>
  </div>
</template>

<script setup lang="tsx">
import { AnForm } from "@/components/form/components/Form";
import { useForm } from "@/components/form/hooks/useForm";

const { model, items, submit, formProps } = useForm({
  model: {},
  items: [
    {
      field: "id",
      render: "input",
    },
    {
      field: 'tod',
      render: 'select',
      options: [
        {
          label: '测试',
          value: 1
        }
      ]
    }
  ],
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
