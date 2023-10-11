<template>
  <drag-resizer
    :x="data.x"
    :y="data.y"
    :w="data.w"
    :h="data.h"
    :parentW="container.width"
    :parentH="container.height"
    :parentScaleX="container.zoom"
    :parentScaleY="container.zoom"
    :parentLimitation="true"
    :preventActiveBehavior="!data.draggable"
    :isActive="data.actived"
    :isResizable="data.resizable"
    :style="blockStyle"
    @dragging="onItemDragOrResize"
    @resizing="onItemDragOrResize"
    @activated="setCurrentBlock(data)"
  >
    <component :is="BlockerMap[data.type].render" :data="data" />
  </drag-resizer>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { BlockerMap } from "../../blocks";
import DragResizer from "../../components/DragResizer.vue";
import { Block, Container, ContextKey } from "../../config";

const props = defineProps({
  data: {
    type: Object as PropType<Block>,
    required: true,
  },
  container: {
    type: Object as PropType<Container>,
    required: true,
  },
});

const { setCurrentBlock } = inject(ContextKey)!;

const blockStyle = computed(() => {
  const { bgColor, bgImage } = props.data;
  return {
    backgroundColor: bgColor,
    backgroundImage: bgImage ? `url(${bgImage})` : undefined,
    backgroundSize: "100% 100%",
  };
});

const onItemDragOrResize = (rect: any) => {
  props.data.x = rect.left;
  props.data.y = rect.top;
  props.data.w = rect.width;
  props.data.h = rect.height;
};
</script>

<style scoped></style>
