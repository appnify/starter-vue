<template>
  <font-render :data="data.params.fontCh">
    {{ dayjs().format(data.params.fontCh.content) }}
  </font-render>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { PropType } from "vue";
import { FontRender } from "../font";
import { Date } from "./interface";

defineProps({
  data: {
    type: Object as PropType<Date>,
    required: true,
  },
});
</script>

<style scoped></style>
../font
