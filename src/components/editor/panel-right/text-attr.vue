<template>
  <div>
    <a-form-item label="内容">
      <a-textarea v-model="block.text" placeholder="输入内容..."></a-textarea>
    </a-form-item>

    <a-form-item label="颜色">
      <a-input v-model="block.color">
        <template #prefix>
          <color-picker v-model="block.color"></color-picker>
        </template>
      </a-input>
    </a-form-item>

    <div class="flex gap-4">
      <a-form-item label="字体">
        <a-select v-model="block.family" :options="TextFamilyOptions" class="w-full overflow-hidden"> </a-select>
      </a-form-item>
      <a-form-item label="大小">
        <a-input-number v-model="block.size" :min="12"> </a-input-number>
      </a-form-item>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <a-form-item label="样式">
        <div class="h-8 flex items-center justify-between">
          <a-tag
            class="cursor-pointer !h-7"
            :color="block.bold ? 'blue' : ''"
            :bordered="block.bold ? true : false"
            @click="block.bold = !block.bold"
          >
            <i class="icon-park-outline-text-bold"></i>
          </a-tag>
          <a-tag
            class="!h-7 cursor-pointer"
            :color="block.italic ? 'blue' : ''"
            :bordered="block.italic ? true : false"
            @click="block.italic = !block.italic"
          >
            <i class="icon-park-outline-text-italic"></i>
          </a-tag>
          <a-tag
            class="!h-7 cursor-pointer"
            :color="block.underline ? 'blue' : ''"
            :bordered="block.underline ? true : false"
            @click="block.underline = !block.underline"
          >
            <i class="icon-park-outline-text-underline"></i>
          </a-tag>
        </div>
      </a-form-item>
      <a-form-item label="方向">
        <a-select v-model="block.align" :options="TextAlignOptions"></a-select>
      </a-form-item>
    </div>

    
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import ColorPicker from "../components/ColorPicker.vue";
import { TextAlignOptions, TextFamilyOptions } from "../interface";

defineProps({
  block: {
    type: Object as PropType<any>,
    required: true,
  },
});
</script>

<style scoped></style>
