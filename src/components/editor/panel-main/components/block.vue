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

const { setCurrentBlock, refLine } = inject(ContextKey)!;

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
  if (refLine.active.value) {
    const { x = 0, y = 0 } = refLine.updateRefLine(rect);
    rect.left += x;
    rect.top += y;
  }
  props.data.x = rect.left;
  props.data.y = rect.top;
  props.data.w = rect.width;
  props.data.h = rect.height;
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
  refLine.active.value = true;
};

/**
 * 激活组件
 */
const onItemActivated = (block: Block) => {
  setCurrentBlock(block);
  refLine.recordBlocksXY();
};

/**
 * 松开鼠标
 */
const onItemMouseup = () => {
  refLine.active.value = false;
};
</script>

<style lang="less" scoped>
.resizer {
  outline: 1px dashed #ccc;
  &:hover {
    outline-color: rgb(var(--primary-6));
    background-color: rgba(var(--primary-1), 0.5);
  }
  &.active {
    &::before {
      outline-style: solid;
      outline-color: rgb(var(--primary-6));
      background-color: rgba(var(--primary-1), 0.5);
    }
  }
  ::v-deep .vdr-stick {
    border-color: rgb(var(--primary-6));
  }
  :deep(.content-container) {
    overflow: hidden;
  }
}
</style>
