<template>
  <div class="h-full w-full grid grid-rows-[auto_1fr] overflow-hidden">
    <div class="py-2 px-4 bg-white">
      <bread-crumb></bread-crumb>
    </div>
    <div class="grid grid-cols-[auto_auto_1fr] h-full overflow-hidden bg-white p-4 m-4 rounded">
      <div>
        <ani-group></ani-group>
      </div>
      <a-divider direction="vertical"></a-divider>
      <div>
        <dict-table></dict-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import aniGroup from "./components/group.vue";
import { useAniTable, useForm, Form } from "@/components";

const form = useForm({
  items: [
    {
      field: "字典名",
      label: "字典名",
      type: "input",
    },
    {
      field: "字典名",
      label: "",
      type: "submit",
    },
  ],
});

const [dictTable, dict] = useAniTable({
  columns: [
    {
      title: "字典名",
      dataIndex: "name",
    },
    {
      title: "字典值",
      dataIndex: "name",
    },
  ],
  create: {
    items: [
      {
        field: "字典名",
        label: "字典名",
        type: "input",
      },
    ],
  },
});
</script>

<style lang="less" scoped></style>

<route lang="json">
{
  "meta": {
    "sort": 20010,
    "title": "字典管理",
    "icon": "icon-park-outline-spanner"
  }
}
</route>
