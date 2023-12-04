<template>
  <div :style="style"></div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Image } from './interface';
import { CSSProperties } from 'vue';

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
