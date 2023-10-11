<template>
  <font-render :data="data.data.fontCh">
    {{ dayjs().format(data.data.format) }}
  </font-render>
</template>

<script setup lang="ts">
import { dayjs } from '@/libs/dayjs';
import { PropType } from "vue";
import { Block } from "../../config";
import { FontRender } from "../font";
import { DateData } from "./interface";

const props = defineProps({
  data: {
    type: Object as PropType<Block<DateData>>,
    required: true,
  },
});
</script>

<style scoped></style>
