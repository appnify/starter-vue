<template>
  <div class="h-full flex items-center justify-between gap-4 pl-4 pr-2 bg-white">
    <div class="flex-1">
      <div class="group">
        <span class="text-gray-400">描述: </span>
        <InputTexter v-model="container.description"></InputTexter>
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
      <!-- <a-tooltip content="预览" position="bottom">
        <a-button type="text" @click="emit('preview')">
          <template #icon>
            <i class="icon-park-outline-play text-base !text-gray-600"></i>
          </template>
        </a-button>
      </a-tooltip>
      <a-tooltip content="设置" position="bottom">
        <a-button type="text" @click="visible = true">
          <template #icon>
            <i class="icon-park-outline-config text-base !text-gray-600"></i>
          </template>
        </a-button>
      </a-tooltip> -->
      <a-tooltip :content="collapsed ? '展开' : '折叠'" position="bottom">
        <a-button type="text" @click="collapsed = !collapsed">
          <template #icon>
            <i
              class="text-base !text-gray-600"
              :class="collapsed ? 'icon-park-outline-expand-right' : 'icon-park-outline-expand-left'"
            ></i>
          </template>
        </a-button>
      </a-tooltip>
      <!-- <EditorMainConfig v-model="container" v-model:visible="visible"></EditorMainConfig> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import InputTexter from './InputTexter.vue';
// import EditorMainConfig from './EditorMainConfig.vue';
import { EditorKey } from '../core';
import { useVModel } from '@vueuse/core';

const props = defineProps({
  rightPanelCollapsed: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['preview', 'update:rightPanelCollapsed']);
const collapsed = useVModel(props, 'rightPanelCollapsed', emit);
const { container, blocks, setContainerOrigin } = inject(EditorKey)!;

const visible = ref(false);
</script>

<style scoped></style>
../core/editor
