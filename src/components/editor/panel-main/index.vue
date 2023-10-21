<template>
  <div class="h-full grid grid-rows-[auto_1fr]">
    <div class="h-10">
      <ani-header :container="container"></ani-header>
    </div>
    <div class="h-full w-full overflow-hidden p-4">
      <div
        class="juetan-editor-container w-full h-full flex items-center justify-center overflow-hidden relative bg-slate-50"
      >
        <div
          class="relative"
          :style="containerStyle"
          @click="onClick"
          @drop="onDragDrop"
          @dragover.prevent
          @wheel="onMouseWheel"
          @mousedown="onMouseDown"
          @mousemove="onMouseMove"
        >
          <ani-block v-for="block in blocks" :key="block.id" :data="block" :container="container"></ani-block>
          <template v-if="refLine.active.value">
            <div
              v-for="line in refLine.xl.value"
              :key="line.y"
              :style="{
                position: 'absolute',
                left: `${line.x}px`,
                top: `${line.y}px`,
                width: `${line.w}px`,
                height: '1px',
                backgroundColor: 'red',
              }"
            ></div>
            <div
              v-for="line in refLine.yl.value"
              :key="line.x"
              :style="{
                position: 'absolute',
                left: `${line.x}px`,
                top: `${line.y}px`,
                width: '1px',
                height: `${line.h}px`,
                backgroundColor: 'red',
              }"
            ></div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cloneDeep } from "lodash-es";
import { CSSProperties } from "vue";
import { BlockerMap } from "../blocks";
import { ContextKey } from "../config";
import AniBlock from "./components/block.vue";
import AniHeader from "./components/header.vue";

const { blocks, container, refLine, setCurrentBlock } = inject(ContextKey)!;

/**
 * 清空当前组件
 */
const onClick = (e: Event) => {
  if (e.target === e.currentTarget) {
    setCurrentBlock(null);
  }
};

const isStart = ref(false);
const position = ref({
  x: 0,
  y: 0,
  startX: 0,
  startY: 0,
  mouseX: 0,
  mouseY: 0,
});

/**
 * 拖拽容器：开始
 */
const onMouseDown = (e: MouseEvent) => {
  isStart.value = true;
  position.value.startX = e.offsetX;
  position.value.startY = e.offsetY;
};

/**
 * 拖拽容器：移动
 */
const onMouseMove = (e: MouseEvent) => {
  if (!isStart.value) {
    return;
  }
  const scale = container.value.zoom;
  container.value.x += (e.offsetX - position.value.startX) * scale;
  container.value.y += (e.offsetY - position.value.startY) * scale;
};

/**
 * 拖拽容器：结束
 */
const onMouseUp = () => {
  isStart.value = false;
};

onMounted(() => {
  window.addEventListener("mouseup", onMouseUp);
});

onUnmounted(() => {
  window.removeEventListener("mouseup", onMouseUp);
});

/**
 * 容器样式
 */
const containerStyle = computed(() => {
  const { width, height, bgColor, bgImage, zoom, x, y } = container.value;
  return {
    position: "absolute",
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: bgColor,
    backgroundImage: bgImage ? `url(${bgImage})` : undefined,
    backgroundSize: "100% 100%",
    transform: `translate3d(${x}px, ${y}px, 0) scale(${zoom})`,
    // transform: `matrix(${zoom}, 0, 0, ${zoom}, ${x}, ${y})`,
    // transformOrigin: "0 0",
  } as CSSProperties;
});

/**
 * 接收拖拽并新增组件
 */
const onDragDrop = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();

  const type = e.dataTransfer?.getData("type");
  if (!type) {
    return;
  }
  const blocker = BlockerMap[type];
  const currentIds = blocks.value.map((item) => Number(item.id));
  const maxId = currentIds.length ? Math.max.apply(null, currentIds) : 0;
  const id = (maxId + 1).toString();
  const title = `${blocker.title}${id}`;
  blocks.value.push({
    ...cloneDeep(blocker.initial),
    id,
    title,
    x: e.offsetX,
    y: e.offsetY,
  });
};

/**
 * 滚轮缩放容器
 */
const onMouseWheel = (e: WheelEvent) => {
  e.preventDefault();
  const prezoom = container.value.zoom;
  let zoom = prezoom;
  if (e.deltaY > 0) {
    zoom += 0.1;
    if (zoom > 10) {
      return;
    }
  } else {
    zoom -= 0.1;
    if (zoom < 0.1) {
      return;
    }
  }
  zoom = parseFloat(zoom.toFixed(1));
  // const { x, y } = position.value
  // const x1 = x + e.offsetX;
  // const y1 = y + e.offsetY;
  // position.value.x = x1 - (x1 - x) * (zoom / prezoom);
  // position.value.y = y1 - (y1 - y) * (zoom / prezoom);
  // position.value.x = e.clientX;
  // position.value.y = e.clientY;
  container.value.zoom = zoom;
};
</script>

<style scoped>
.juetan-editor-container {
  --color: rgba(0, 0, 0, 0.2);
  background: linear-gradient(
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
