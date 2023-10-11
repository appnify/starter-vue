<template>
  <div class="w-[248px] overflow-hidden p-3">
    <a-radio-group type="button" class="w-full mb-2">
      <a-radio value="1">基本</a-radio>
      <a-radio value="2">文本</a-radio>
    </a-radio-group>
    <a-form :model="block" layout="vertical">
      <div v-if="current.block" class="muti-form-item mt-2">
        <component :is="BlockerMap[current.block.type].option" :data="current.block" />
      </div>
      <a-empty v-else :description="'选择组件后显示'" class="mt-8"></a-empty>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { BlockerMap } from "../blocks";
import { ContextKey } from "../config";
import TextAttr from "./text-attr.vue";

const { current } = inject(ContextKey)!;

const item = ref<any>({
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

const block = ref({
  x: 10,
  y: 19,
  w: 20,
  h: 5,
  volume: 39,
  textStyle: {
    family: "simsun",
    bold: false,
    italic: false,
    underline: false,
    size: 14,
    color: "#33cc99",
    align: 3,
  },
  meta: {
    vFixed: false,
    hFixed: false,
  },
});
</script>

<style scoped></style>
