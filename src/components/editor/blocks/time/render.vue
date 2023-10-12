<template>
  <font-render :data="data.params.fontCh">
    {{ time }}
  </font-render>
</template>

<script setup lang="ts">
import { dayjs } from "@/libs/dayjs";
import { PropType, onMounted, onUnmounted, ref } from "vue";
import { FontRender } from "../components/font";
import { Time } from "./interface";

const props = defineProps({
  data: {
    type: Object as PropType<Time>,
    required: true,
  },
});

const format = computed(() => props.data.params.fontCh.content || "HH:mm:ss");
const time = ref(dayjs().format(format.value));
let timer: any = null;

onMounted(() => {
  timer = setInterval(() => {
    time.value = dayjs().format(format.value);
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style scoped></style>
../components/font
