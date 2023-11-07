<template>
  <div class="h-full w-[248px] overflow-hidden" :style="`display: ${collapsed ? 'none' : 'block'}`">
    <div v-if="model" class="p-3">
      <a-form :model="{}" layout="vertical">
        <div class="muti-form-item mt-2">
          <component :is="BlockerMap[model.type].option" v-model="model" />
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
import { Block } from "../core";

const collapsed = defineModel<boolean>("collapsed");
const model = defineModel<Block | null>("block");
</script>

<style scoped></style>
../core
