<template>
  <div :style="style" class="w-full h-full bg-orange-500 flex items-center justify-center text-white text-lg">
    图片组件
  </div>
</template>

<script setup lang="ts">
import { CSSProperties, PropType } from 'vue';
import { Image } from './interface';

const props = defineProps({
  data: {
    type: Object as PropType<Image>,
    required: true,
  },
});

const style = computed(() => {
  return {
    width: '100%',
    height: '100%',
    backgroundImage: `url(${props.data.params.images[0]?.url})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: props.data.params.fit
  } as CSSProperties;
});
</script>

<style scoped></style>
../components/font../font
