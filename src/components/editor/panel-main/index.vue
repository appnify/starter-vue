<template>
  <div class="h-full grid grid-rows-[auto_1fr]">
    <div class="h-10 flex items-center justify-between gap-4 px-4 bg-white">
      <div>
        <span class="group">
          <span class="text-gray-400">描述: </span>
          国庆节上午9:00-10:00版式设计
          <i
            class="!hidden !group-hover:inline-block icon-park-outline-edit text-gray-400 hover:text-gray-700 ml-1"
          ></i>
        </span>
      </div>
      <div class="flex items-center">
        <span class="text-gray-400 text-xs mr-2">
          尺寸：
          <span class="text-gray-700">1920 * 1080</span>
        </span>
        <span class="text-gray-400 text-xs mr-2">
          比例：
          <span class="text-gray-700">100%</span>
        </span>
        <span class="text-gray-400 text-xs mr-2">
          组件：
          <span class="text-gray-700">3 个</span>
        </span>
        <a-tooltip content="预览" position="bottom">
          <a-button type="text">
            <template #icon>
              <i class="icon-park-outline-play text-base !text-gray-600"></i>
            </template>
          </a-button>
        </a-tooltip>
        <a-popover position="br" trigger="click">
          <a-button type="text">
            <template #icon>
              <i class="icon-park-outline-config text-base !text-gray-600"></i>
            </template>
          </a-button>
          <template #content>
            <span>
              背景图片:
              <a-link>选择</a-link>
            </span>
            <span class="inline-flex items-center">
              背景颜色：
              <color-picker></color-picker>
            </span>
          </template>
        </a-popover>
      </div>
    </div>
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
import ColorPicker from "../components/ColorPicker.vue";
import DragResizer from "../components/DragResizer.vue";
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

const onItemDragOrResize = (rect: any) => {
  item.value.x = rect.left;
  item.value.y = rect.top;
  item.value.w = rect.width;
  item.value.h = rect.height;
};

const textCh = {
  text: "进站前请准备好车票或乘车二维码。进站前请主动配合车站工作人员,接受安检,准备好自己的车票或乘车二维码。车站检票闸机会扫描并验证车票或乘车二维码,验证通过后方可进站。",
  family: "",
  bold: false,
  italic: false,
  underline: false,
  size: 14,
  color: "#ffffff",
  align: 3,
};
</script>

<style scoped></style>
