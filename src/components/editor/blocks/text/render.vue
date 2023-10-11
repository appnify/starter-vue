<template>
  <ani-marquee
    v-if="data.data.marquee"
    :style="style"
    :speed="data.data.marqueeSpeed"
    :direction="data.data.marqueeDirection"
  >
    {{ data.data.fontCh.content }}
  </ani-marquee>
  <font-render v-else :data="data.data.fontCh"></font-render>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { FontRender, getFontStyle } from "../font";
import { Block } from "../../config";
import { TextData } from "./interface";
import AniMarquee from "./marquee.vue";

const props = defineProps({
  data: {
    type: Object as PropType<Block<TextData>>,
    required: true,
  },
});

const style = computed(() => {
  return getFontStyle(props.data.data.fontCh);
});
</script>

<style scoped></style>
