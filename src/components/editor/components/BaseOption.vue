<template>
  <div>
    <a-form-item label="组件名称">
      <a-input v-model="model.title"></a-input>
    </a-form-item>

    <div class="flex gap-4">
      <a-form-item label="左侧">
        <a-input-number v-model="model.x" :min="0" :max="container.width">
          <template #prefix>
            <a-tooltip content="固定水平方向">
              <i
                class="cursor-pointer text-gray-400 hover:text-gray-700"
                :class="
                  model.xFixed ? 'icon-park-outline-lock text-gray-900' : 'icon-park-outline-unlock text-gray-400'
                "
                @click="model.xFixed = !model.xFixed"
              ></i>
            </a-tooltip>
          </template>
        </a-input-number>
      </a-form-item>
      <a-form-item label="顶部">
        <a-input-number v-model="model.y" :min="0" :max="container.height">
          <template #prefix>
            <a-tooltip content="固定垂直方向">
              <i
                class="cursor-pointer text-gray-400 hover:text-gray-700"
                :class="
                  model.yFixed ? 'icon-park-outline-lock text-gray-900' : 'icon-park-outline-unlock text-gray-400'
                "
                @click="model.yFixed = !model.yFixed"
              ></i>
            </a-tooltip>
          </template>
        </a-input-number>
      </a-form-item>
    </div>

    <div class="flex gap-4">
      <a-form-item label="宽度">
        <a-input-number v-model="model.w" :min="0" :max="container.width"> </a-input-number>
      </a-form-item>
      <a-form-item label="高度">
        <a-input-number v-model="model.h" :min="0" :max="container.height"> </a-input-number>
      </a-form-item>
    </div>

    <a-form-item label="背景图片">
      <input-image v-model="model.bgImage"></input-image>
    </a-form-item>

    <a-form-item label="背景颜色">
      <input-color v-model="model.bgColor"></input-color>
    </a-form-item>
  </div>
</template>

<script setup lang="ts">
import { Block, EditorKey } from "../core";
import InputColor from "./InputColor.vue";
import InputImage from "./InputImage.vue";

const model = defineModel<Block>({ required: true });
const { container } = inject(EditorKey)!;
</script>

<style scoped></style>
../core../core/editor
