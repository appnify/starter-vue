<template>
  <ani-marquee v-if="data.params.marquee" :style="style" :speed="data.params.speed" :direction="data.params.direction">
    {{ data.params.fontCh.content }}
  </ani-marquee>
  <font-render v-else :data="data.params.fontCh"></font-render>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { FontRender, getFontStyle } from "../font";
import { Text } from "./interface";
import AniMarquee from "./marquee.vue";

const props = defineProps({
  data: {
    type: Object as PropType<Text>,
    required: true,
  },
});

const style = computed(() => {
  return getFontStyle(props.data.params.fontCh);
});
</script>

<style scoped></style>
../components/font../font