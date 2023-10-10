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
import ColorPicker from "../components/ColorPicker.vue";
import AniBlock from "./components/block.vue";
import AniHeader from "./components/header.vue";
import { Block, ContextKey, Container } from "../config";

const isStart = ref(false);
const position = ref({
  x: 0,
  y: 0,
  startX: 0,
  startY: 0,
  mouseX: 0,
  mouseY: 0,
});

const onMouseDown = (e: Event) => {
  isStart.value = true;
  position.value.startX = e.offsetX;
  position.value.startY = e.offsetY;
};

const onMouseMove = (e: Event) => {
  if (!isStart.value) {
    return;
  }
  const scale = container.value.zoom;
  position.value.x += (e.offsetX - position.value.startX) * scale;
  position.value.y += (e.offsetY - position.value.startY) * scale;
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

const { blocks, container } = inject(ContextKey);

const containerStyle = computed(() => {
  const { width, height, bgColor, bgImage, zoom } = container.value;
  const { x, y } = position.value;
  return {
    position: "absolute",
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: bgColor,
    backgroundImage: bgImage ? `url(${bgImage})` : undefined,
    backgroundSize: "100% 100%",
    // transform: `translate3d(${x}px, ${y}px, 0) scale(${zoom})`,
    transform: `matrix(${zoom}, 0, 0, ${zoom}, ${x}, ${y})`,
    // transformOrigin: "0 0",
  };
});

const onDragDrop = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();

  const type = e.dataTransfer?.getData("type");
  if (!type) {
    return;
  }

  blocks.value.push({
    x: 0,
    y: 0,
    w: 200,
    h: 100,
    bgColor: "#0099ff",
    xFixed: false,
    yFixed: false,
    resizable: true,
    draggable: true,
    type,
    x: e.offsetX,
    y: e.offsetY,
  });
};

const onMouseWheel = (e: WheelEvent) => {
  e.preventDefault();
  const prezoom = container.value.zoom;
  let zoom = prezoom;
  if (e.wheelDelta > 0) {
    console.log("放大");
    zoom += 0.1;
    if (zoom > 10) {
      return;
    }
  } else {
    console.log("缩小");
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
