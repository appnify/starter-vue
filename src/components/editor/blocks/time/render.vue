<template>
  <font-render :data="model.params.fontCh">
    {{ time }}
  </font-render>
</template>

<script setup lang="ts">
import { dayjs } from "@/libs/dayjs";
import { onMounted, onUnmounted, ref } from "vue";
import { FontRender } from "../components/font";
import { Time } from "./interface";

const model = defineModel<Time>({ required: true });
const format = computed(() => model.value.params.fontCh.content || "HH:mm:ss");
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
