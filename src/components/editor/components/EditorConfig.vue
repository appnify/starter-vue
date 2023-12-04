<template>
  <a-drawer v-model:visible="show" :footer="false" title="配置">
    <a-form :model="{}" layout="vertical">
      <a-form-item label="标题">
        <a-input v-model="model.title"></a-input>
      </a-form-item>

      <a-form-item label="描述">
        <a-textarea v-model="model.description"></a-textarea >
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
    </a-form>
  </a-drawer>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Container } from '../core';
import { useVModel } from '@vueuse/core';
import InputImage from './InputImage.vue';
import InputColor from './InputColor.vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Object as PropType<Container>,
    required: true,
  },
});

const emit = defineEmits(['update:visible', 'update:modelValue']);

const show = useVModel(props, 'visible', emit);
const model = useVModel(props, 'modelValue', emit);
</script>

<style scoped></style>
