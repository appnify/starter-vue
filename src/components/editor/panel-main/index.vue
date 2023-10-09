<template>
  <div class="h-full grid grid-rows-[auto_1fr]">
    <div class="h-10 bg-white"></div>
    <div class="h-full p-5 px-6">
      <div class="bg-white h-full relative">
        <drag-resizer
          :style="{ backgroundColor: item.bgColor }"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :parentLimitation="true"
          @dragging="onItemDragOrResize"
          @resizing="onItemDragOrResize"
        >
          <text-render :data="textCh"> </text-render>
        </drag-resizer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DragResizer from "vue-drag-resize";
import TextRender from "../items/text/render.vue";

const item = ref({
  x: 0,
  y: 0,
  w: 200,
  h: 100,
  bgColor: "#0099ff",
  xFixed: false,
  yFixed: false,
  resizable: true,
  draggable: true,
});

const onItemDragOrResize = (rect) => {
  item.value.x = rect.left;
  item.value.y = rect.top;
  item.value.w = rect.width;
  item.value.h = rect.height;
};

const textCh = {
  text: "文本",
  family: "simsun",
  bold: false,
  italic: false,
  underline: false,
  size: 14,
  color: "#33cc99",
  align: 3,
};
</script>

<style scoped></style>
