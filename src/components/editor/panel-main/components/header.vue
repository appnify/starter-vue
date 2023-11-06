<template>
  <div class="h-full flex items-center justify-between gap-4 pl-4 pr-2 bg-white">
    <div class="flex-1">
      <div class="group">
        <span class="text-gray-400">描述: </span>
        <ani-texter v-model="container.description"></ani-texter>
      </div>
    </div>
    <div class="flex items-center">
      <span class="text-gray-400 text-xs mr-3">
        坐标：
        <span class="text-gray-700">{{ Math.floor(container.x) }} , {{ Math.floor(container.y) }} </span>
      </span>
      <span class="text-gray-400 text-xs mr-3">
        画布：
        <span class="text-gray-700">{{ container.width }} * {{ container.height }} </span>
      </span>
      <span class="text-gray-400 text-xs mr-2">
        比例：
        <span class="inline-block w-8 text-gray-700">{{ Math.floor(container.zoom * 100) }}% </span>
      </span>
      <span class="text-gray-400 text-xs mr-2">
        组件：
        <span class="inline-block w-8 text-gray-700">{{ blocks.length }} 个</span>
      </span>
      <a-tooltip content="自适应比例" position="bottom">
        <a-button type="text" @click="setContainerOrigin">
          <template #icon>
            <i class="icon-park-outline-equal-ratio text-base !text-gray-600"></i>
          </template>
        </a-button>
      </a-tooltip>
      <a-tooltip content="预览" position="bottom">
        <a-button type="text" @click="preview">
          <template #icon>
            <i class="icon-park-outline-play text-base !text-gray-600"></i>
          </template>
        </a-button>
      </a-tooltip>
      <a-popover position="br" trigger="click">
        <a-tooltip content="设置" position="bottom">
          <a-button type="text">
            <template #icon>
              <i class="icon-park-outline-config text-base !text-gray-600"></i>
            </template>
          </a-button>
        </a-tooltip>
        <template #content>
          <a-form :model="{}" layout="vertical">
            <div class="muti-form-item">
              <a-form-item label="背景图片">
                <input-image v-model="container.bgImage"></input-image>
              </a-form-item>
              <a-form-item label="背景颜色">
                <input-color v-model="container.bgColor"></input-color>
              </a-form-item>
            </div>
          </a-form>
        </template>
      </a-popover>
      <a-tooltip :content="rightPanelCollapsed ? '展开' : '折叠'" position="bottom">
        <a-button type="text" @click="rightPanelCollapsed = !rightPanelCollapsed">
          <template #icon>
            <i
              class="text-base !text-gray-600"
              :class="rightPanelCollapsed ? 'icon-park-outline-expand-right' : 'icon-park-outline-expand-left'"
            ></i>
          </template>
        </a-button>
      </a-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputColor from "../../components/InputColor.vue";
import InputImage from "../../components/InputImage.vue";
import { ContextKey } from "../../config";
import AniTexter from "./texter.vue";

const { container, blocks, preview, setContainerOrigin } = inject(ContextKey)!;

const rightPanelCollapsed = defineModel<boolean>();
</script>

<style scoped></style>
