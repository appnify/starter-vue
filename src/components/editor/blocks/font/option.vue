<template>
  <div>
    <slot>
      <a-form-item label="内容">
        <a-textarea v-model="model.content" placeholder="输入内容..."></a-textarea>
      </a-form-item>
    </slot>

    <a-form-item label="颜色">
      <input-color v-model="model.color"></input-color>
    </a-form-item>

    <div class="flex gap-4">
      <a-form-item label="字体">
        <a-select v-model="model.family" :options="FontFamilyOptions" class="w-full overflow-hidden"> </a-select>
      </a-form-item>
      <a-form-item label="大小">
        <a-input-number v-model="model.size" :min="12" :step="2"> </a-input-number>
      </a-form-item>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <a-form-item label="样式">
        <div class="h-8 flex items-center justify-between">
          <a-tag
            class="cursor-pointer !h-7"
            :color="model.bold ? 'blue' : ''"
            :bordered="model.bold ? true : false"
            @click="model.bold = !model.bold"
          >
            <i class="icon-park-outline-text-bold"></i>
          </a-tag>
          <a-tag
            class="!h-7 cursor-pointer"
            :color="model.italic ? 'blue' : ''"
            :bordered="model.italic ? true : false"
            @click="model.italic = !model.italic"
          >
            <i class="icon-park-outline-text-italic"></i>
          </a-tag>
          <a-tag
            class="!h-7 cursor-pointer"
            :color="model.underline ? 'blue' : ''"
            :bordered="model.underline ? true : false"
            @click="model.underline = !model.underline"
          >
            <i class="icon-park-outline-text-underline"></i>
          </a-tag>
        </div>
      </a-form-item>
      <a-form-item label="方向">
        <a-select v-model="model.align" :options="AlignOptions"></a-select>
      </a-form-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputColor from "../../components/InputColor.vue";
import { AlignOptions, Font, FontFamilyOptions } from "./interface";

const model = defineModel<Font>({ required: true });
</script>

<style scoped></style>
./types
