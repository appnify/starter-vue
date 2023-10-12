<template>
  <div class="h-full w-[248px] overflow-hidden" :style="`display: ${current.rightPanelCollapsed ? 'none' : 'block'}`">
    <div v-if="current.block" class="p-3">
      <a-radio-group type="button" default-value="1" class="w-full mb-2">
        <a-radio value="1">属性</a-radio>
        <a-radio value="2">文本</a-radio>
      </a-radio-group>
      <a-form :model="{}" layout="vertical">
        <div class="muti-form-item mt-2">
          <component :is="BlockerMap[current.block.type].option" :data="current.block" />
        </div>
      </a-form>
    </div>
    <div v-else class="w-full h-full flex justify-center items-center">
      <a-empty :description="'选择组件后显示'" class="mt-8"></a-empty>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BlockerMap } from "../blocks";
import { ContextKey } from "../config";

const { current } = inject(ContextKey)!;
</script>

<style scoped></style>
