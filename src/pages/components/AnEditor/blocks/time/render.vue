<template>
  <font-render :data="props.data.params.fontCh">
    {{ updatedTime || time }}
  </font-render>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { PropType, onMounted, onUnmounted, ref } from 'vue';
import { FontRender } from '../font';
import { Time } from './interface';

const props = defineProps({
  data: {
    type: Object as PropType<Time>,
    required: true,
  },
  update: {
    type: Boolean,
    default: false,
  },
});

const format = computed(() => props.data.params.fontCh.content || 'HH:mm:ss');
const time = computed(() => dayjs().format(format.value));
const updatedTime = ref('')

if (props.update) {
  let timer: any = null;

  onMounted(() => {
    timer = setInterval(() => {
      updatedTime.value = dayjs().format(format.value);
    }, 1000);
  });

  onUnmounted(() => {
    clearInterval(timer);
  });
}
</script>

<style scoped></style>
../components/font ../font
