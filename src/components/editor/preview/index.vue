<template>
  <div class="h-0 overflow-hidden">
    <div ref="el" class="bg-white w-screen h-screen select-none">
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
import { Message } from "@arco-design/web-vue";
import { useFullscreen } from "@vueuse/core";
import { BlockerMap } from "../blocks";
import { ContextKey } from "../config";

const { container, blocks } = inject(ContextKey)!;

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:visible"]);
const el = ref<HTMLElement | null>(null);
const { enter, isFullscreen, isSupported } = useFullscreen(el);

watch(
  () => isFullscreen.value,
  () => {
    if (!isFullscreen.value) {
      emit("update:visible", false);
    }
  }
);

watch(
  () => props.visible,
  (value) => {
    if (!value) {
      return;
    }
    if (!isSupported.value) {
      Message.warning("抱歉，您的浏览器不支持全屏功能！");
      return;
    }
    enter();
  }
);
</script>

<style scoped></style>
