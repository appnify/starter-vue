<template>
  <div>
    <div class="flex gap-4">
      <a-form-item label="左侧">
        <a-input-number v-model="data.x" :min="0" :max="100">
          <template #prefix>
            <a-tooltip content="固定水平方向">
              <i
                class="cursor-pointer text-gray-400 hover:text-gray-700"
                :class="data.xFixed ? 'icon-park-outline-lock text-gray-900' : 'icon-park-outline-unlock text-gray-400'"
                @click="data.xFixed = !data.xFixed"
              ></i>
            </a-tooltip>
          </template>
        </a-input-number>
      </a-form-item>
      <a-form-item label="顶部">
        <a-input-number v-model="data.y" :min="0" :max="100">
          <template #prefix>
            <a-tooltip content="固定垂直方向">
              <i
                class="cursor-pointer text-gray-400 hover:text-gray-700"
                :class="data.yFixed ? 'icon-park-outline-lock text-gray-900' : 'icon-park-outline-unlock text-gray-400'"
                @click="data.yFixed = !data.yFixed"
              ></i>
            </a-tooltip>
          </template>
        </a-input-number>
      </a-form-item>
    </div>

    <div class="flex gap-4">
      <a-form-item label="宽度">
        <a-input-number v-model="data.w" :min="0" :max="100"> </a-input-number>
      </a-form-item>
      <a-form-item label="高度">
        <a-input-number v-model="data.h" :min="0" :max="100"> </a-input-number>
      </a-form-item>
    </div>

    <a-form-item label="背景图片">
      <input-image v-model="data.bgImage"></input-image>
    </a-form-item>

    <a-form-item label="背景颜色">
      <a-input v-model="data.bgColor" allow-clear placeholder="无">
        <template #prefix>
          <color-picker v-model="data.bgColor"></color-picker>
        </template>
      </a-input>
    </a-form-item>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import InputImage from "../../components/InputImage.vue";

defineProps({
  data: {
    type: Object as PropType<any>,
    required: true,
  },
});
</script>
