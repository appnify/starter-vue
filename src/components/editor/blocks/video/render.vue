<template>
  <div :style="style" class="w-full h-full bg-brand-500 flex items-center justify-center text-white text-lg">
    视频组件
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Video } from './interface';
import { CSSProperties } from 'vue';

const props = defineProps({
  data: {
    type: Object as PropType<Video>,
    required: true,
  },
});

const style = computed(() => {
  return {
    backgroundImage: `url()`,
    objectFit: props.data.params.fit,
  } as CSSProperties;
});
</script>

<style scoped></style>
../components/font../font
