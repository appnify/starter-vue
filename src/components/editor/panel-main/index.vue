<template>
  <div class="h-full grid grid-rows-[auto_1fr]">
    <div class="h-10">
      <ani-header :container="container"></ani-header>
    </div>
    <div class="h-full w-full overflow-hidden p-4">
      <div class="dd1 w-full h-full flex items-center justify-center overflow-hidden relative bg-slate-50">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BlockerMap } from "../blocks";
import { ContextKey } from "../config";
import AniBlock from "./components/block.vue";
import AniHeader from "./components/header.vue";
import { cloneDeep } from "lodash-es";

const { blocks, container, setCurrentBlock } = inject(ContextKey)!;

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

const onMouseDown = (e: MouseEvent) => {
  isStart.value = true;
  position.value.startX = e.offsetX;
  position.value.startY = e.offsetY;
};

const onMouseMove = (e: MouseEvent) => {
  if (!isStart.value) {
    return;
  }
  const scale = container.value.zoom;
  container.value.x += (e.offsetX - position.value.startX) * scale;
  container.value.y += (e.offsetY - position.value.startY) * scale;
};

const onMouseUp = () => {
  isStart.value = false;
};

onMounted(() => {
  window.addEventListener("mouseup", onMouseUp);
});

onUnmounted(() => {
  window.removeEventListener("mouseup", onMouseUp);
});

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
  } as any;
});

const onDragDrop = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();

  const type = e.dataTransfer?.getData("type");
  if (!type) {
    return;
  }
  const blocker = BlockerMap[type];
  const currentIds = blocks.value.map((item) => item.id);
  const maxId = Math.max(...currentIds.map((item) => parseInt(item)));
  const id = (maxId + 1).toString();

  blocks.value.push({
    ...cloneDeep(blocker.initial),
    id,
    x: e.offsetX,
    y: e.offsetY,
  });
};

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
.dd1 {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==);
}
</style>
