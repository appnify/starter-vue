<template>
  <div>
    <slot name="content">
      <a-form-item label="内容">
        <a-textarea v-model="data.content" placeholder="输入内容..."></a-textarea>
      </a-form-item>
    </slot>

    <a-form-item label="颜色">
      <input-color v-model="data.color"></input-color>
    </a-form-item>

    <div class="flex gap-4">
      <a-form-item label="字体">
        <a-select v-model="data.family" :options="FontFamilyOptions" class="w-full overflow-hidden"> </a-select>
      </a-form-item>
      <a-form-item label="大小">
        <a-input-number v-model="data.size" :min="12"> </a-input-number>
      </a-form-item>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <a-form-item label="样式">
        <div class="h-8 flex items-center justify-between">
          <a-tag
            class="cursor-pointer !h-7"
            :color="data.bold ? 'blue' : ''"
            :bordered="data.bold ? true : false"
            @click="data.bold = !data.bold"
          >
            <i class="icon-park-outline-text-bold"></i>
          </a-tag>
          <a-tag
            class="!h-7 cursor-pointer"
            :color="data.italic ? 'blue' : ''"
            :bordered="data.italic ? true : false"
            @click="data.italic = !data.italic"
          >
            <i class="icon-park-outline-text-italic"></i>
          </a-tag>
          <a-tag
            class="!h-7 cursor-pointer"
            :color="data.underline ? 'blue' : ''"
            :bordered="data.underline ? true : false"
            @click="data.underline = !data.underline"
          >
            <i class="icon-park-outline-text-underline"></i>
          </a-tag>
        </div>
      </a-form-item>
      <a-form-item label="方向">
        <a-select v-model="data.align" :options="AlignOptions"></a-select>
      </a-form-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import InputColor from "../../components/InputColor.vue";
import { AlignOptions, Font, FontFamilyOptions } from "./interface";

defineProps({
  data: {
    type: Object as PropType<Font>,
    required: true,
  },
});
</script>

<style scoped></style>
./types
