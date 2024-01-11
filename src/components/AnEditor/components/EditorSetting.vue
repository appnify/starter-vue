<template>
  <div class="p-3">
    <a-tag class="text-sm! mb-2 w-full" size="large" color="blue" :bordered="false">
      <template #icon>
        <i class="icon-park-outline-config" ></i>
      </template>
      画布属性
    </a-tag>
    <a-form :model="{}" layout="vertical">
      <a-form-item label="标题">
        <a-input v-model="model.title"></a-input>
      </a-form-item>

      <a-form-item label="描述">
        <a-textarea v-model="model.description"></a-textarea>
      </a-form-item>

      <div class="flex gap-4">
        <a-form-item label="宽度">
          <a-input-number v-model="model.width" :min="0"> </a-input-number>
        </a-form-item>
        <a-form-item label="高度">
          <a-input-number v-model="model.height" :min="0"> </a-input-number>
        </a-form-item>
      </div>

      <a-form-item label="背景图片">
        <input-image v-model="model.bgImage"></input-image>
      </a-form-item>

      <a-form-item label="背景颜色">
        <input-color v-model="model.bgColor"></input-color>
      </a-form-item>

      <a-form-item label="语言列表">
        <a-checkbox-group v-model="model.langList" direction="vertical" class="bg-gray-100 w-full px-1.5 py-1 rounded">
          <a-checkbox value="ch">中文<span class="text-gray-400">(cn)</span></a-checkbox>
          <a-checkbox value="en">英语<span class="text-gray-400">(en)</span></a-checkbox>
          <a-checkbox value="ru">俄语<span class="text-gray-400">(ru)</span></a-checkbox>
        </a-checkbox-group>
      </a-form-item>

      <a-form-item label="语言切换">
        <a-input-number v-model="model.langSwitch" :min="0">
          <template #append>
            秒(s)
          </template>
        </a-input-number>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Container } from '../core';
import { useVModel } from '@vueuse/core';

const props = defineProps({
  modelValue: {
    type: Object as PropType<Container>,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const model = useVModel(props, 'modelValue', emit);
</script>

<style scoped></style>
