<template>
  <div class="h-0 overflow-hidden">
    <div ref="el" class="an-screen bg-white w-screen h-screen select-none flex items-center justify-center">
      <div
        v-if="visible"
        :style="{
          position: 'relative',
          overflow: 'hidden',
          width: `${container.width}px`,
          height: `${container.height}px`,
          backgroundImage: `url(${container.bgImage})`,
          backgroundColor: container.bgColor,
          backgroundSize: '100% 100%',
        }"
      >
        <div
          v-for="block in blocks"
          :key="block.id"
          :style="{
            position: 'absolute',
            overflow: 'hidden',
            left: `${block.x}px`,
            top: `${block.y}px`,
            width: `${block.w}px`,
            height: `${block.h}px`,
            backgroundImage: `url(${block.bgImage})`,
            backgroundColor: block.bgColor,
            backgroundSize: '100% 100%',
          }"
        >
          <component :is="BlockerMap[block.type].render" :data="block" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue';
import { useFullscreen, useVModel } from '@vueuse/core';
import { BlockerMap } from '../blocks';
import { Block, Container } from '../core';
import { PropType } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  container: {
    type: Object as PropType<Container>,
    required: true,
  },
  blocks: {
    type: Array as PropType<Block[]>,
    required: true,
  },
});

const emit = defineEmits(['update:visible']);
const show = useVModel(props, 'visible', emit);
const el = ref<HTMLElement | null>(null);
const { enter, isFullscreen, isSupported } = useFullscreen(el);

watch(
  () => isFullscreen.value,
  () => {
    if (!isFullscreen.value) {
      show.value = false;
    }
  }
);

watch(
  () => show.value,
  value => {
    if (!value) {
      return;
    }
    if (!isSupported.value) {
      Message.warning('抱歉，您的浏览器不支持全屏功能！');
      return;
    }
    enter();
  }
);
</script>

<style scoped>
.an-screen {
  --color: rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(
      45deg,
      var(--color) 25%,
      transparent 25%,
      transparent 75%,
      var(--color) 75%,
      var(--color) 100%
    ),
    linear-gradient(45deg, var(--color) 25%, transparent 25%, transparent 75%, var(--color) 75%, var(--color) 100%);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
}
</style>
../core/editor
