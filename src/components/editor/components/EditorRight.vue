<template>
  <div class="h-full w-[248px] overflow-hidden" :style="`display: ${collapsed ? 'none' : 'block'}`">
    <div v-if="model" class="p-3 pr-0 grid grid-rows-[auto_1fr]">
      <a-tag class="text-sm! mb-2 mr-3" size="large" color="blue" :bordered="true">
        <template #icon>
          <i class="icon-park-outline-components"></i>
        </template>
        组件属性({{ BlockerMap[model.type].title }})
      </a-tag>
      <a-scrollbar outer-class="h-full overflow-hidden" class="h-full overflow-auto">
        <a-form :model="{}" layout="vertical" class="pr-3">
          <div class="muti-form-item mt-1">
            <component :is="BlockerMap[model.type].option" v-model="model" />
          </div>
        </a-form>
      </a-scrollbar>
    </div>
    <div v-show="!model" class="w-full h-full">
      <EditorSetting v-model="container"></EditorSetting>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BlockerMap } from '../blocks';
import { Block, EditorKey } from '../core';
import EditorSetting from './EditorSetting.vue';

const collapsed = defineModel<boolean>('collapsed');
const model = defineModel<Block | null>('block');
const { container } = inject(EditorKey)!;
</script>

<style scoped></style>
../core
