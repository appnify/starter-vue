<template>
  <div :style="style" class="w-full h-full bg-blue-500 flex items-center justify-center text-white text-lg">
    视频组件
  </div>
</template>

<script setup lang="ts">
import { CSSProperties, PropType } from 'vue';
import { Video } from './interface';

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
