<template>
  <font-render :data="data.data.fontCh">
    {{ currentTime }}
  </font-render>
</template>

<script setup lang="ts">
import { dayjs } from "@/libs/dayjs";
import { PropType, onMounted, onUnmounted, ref } from "vue";
import { Block } from "../../config";
import { FontRender } from "../font";
import { TimeData } from "./interface";

const props = defineProps({
  data: {
    type: Object as PropType<Block<TimeData>>,
    required: true,
  },
});

const currentTime = ref("");
const timer: any = null;

onMounted(() => {
  const timer = setInterval(() => {
    currentTime.value = dayjs().format(props.data.data.format);
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style scoped></style>
