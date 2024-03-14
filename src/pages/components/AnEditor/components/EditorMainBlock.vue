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
    :class="'resizer'"
    @dragging="onItemDragging"
    @resizing="onItemResizing"
    @activated="onItemActivated(data)"
    @mousedown="onItemMouseDown"
    @mouseup="onItemMouseup"
  >
    <component :is="BlockerMap[data.type].render" :data="data" />
  </drag-resizer>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { BlockerMap } from "../blocks";
import DragResizer from "./DragResizer.vue";
import { Block, Container } from "../core";
import { ContextKey } from "../core/plugin";

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

const { setCurrentBlock, refLine } = inject(ContextKey)!;
const { active, recordBlocksXY, updateRefLine } = refLine;

/**
 * 组件样式
 */
const blockStyle = computed(() => {
  const { bgColor, bgImage } = props.data;
  return {
    backgroundColor: bgColor,
    backgroundImage: bgImage ? `url(${bgImage})` : undefined,
    backgroundSize: "100% 100%",
  };
});

/**
 * 拖拽组件
 */
const onItemDragging = (rect: any) => {
  if (active.value) {
    const { offsetX = 0, offsetY = 0 } = updateRefLine(rect);
    rect.left += offsetX;
    rect.top += offsetY;
  }
  onItemResizing(rect);
};

/**
 * 拉伸组件
 */
const onItemResizing = (rect: any) => {
  props.data.x = rect.left;
  props.data.y = rect.top;
  props.data.w = rect.width;
  props.data.h = rect.height;
};

/**
 * 按下鼠标
 */
const onItemMouseDown = () => {
  active.value = true;
};

/**
 * 激活组件
 */
const onItemActivated = (block: Block) => {
  setCurrentBlock(block);
  recordBlocksXY();
};

/**
 * 松开鼠标
 */
const onItemMouseup = () => {
  active.value = false;
};
</script>

<style lang="less" scoped>
.resizer {
  outline: 1px dashed #ccc;
  outline-offset: -1px;
  &::before {
    outline-offset: -1px;
  }
  &:hover {
    outline-color: rgb(var(--primary-6));
    background-color: rgba(var(--primary-1), 0.5);
  }
  &.active {
    &::before {
      outline-style: solid;
      outline-color: rgb(var(--primary-6));
    }
  }
  :deep(.vdr-stick) {
    border-color: rgb(var(--primary-6));
  }
  :deep(.content-container) {
    overflow: hidden;
  }
}
</style>
../core../core/editor
