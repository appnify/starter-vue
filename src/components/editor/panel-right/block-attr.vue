<template>
  <div>
    <div class="flex gap-4">
      <a-form-item label="左侧">
        <a-input-number v-model="block.x" :min="0" :max="100">
          <template #prefix>
            <a-tooltip content="固定水平方向">
              <i
                class="cursor-pointer text-gray-400 hover:text-gray-700"
                :class="
                  block.xFixed ? 'icon-park-outline-lock text-gray-900' : 'icon-park-outline-unlock text-gray-400'
                "
                @click="block.xFixed = !block.xFixed"
              ></i>
            </a-tooltip>
          </template>
        </a-input-number>
      </a-form-item>
      <a-form-item label="顶部">
        <a-input-number v-model="block.y" :min="0" :max="100">
          <template #prefix>
            <a-tooltip content="固定垂直方向">
              <i
                class="cursor-pointer text-gray-400 hover:text-gray-700"
                :class="
                  block.yFixed ? 'icon-park-outline-lock text-gray-900' : 'icon-park-outline-unlock text-gray-400'
                "
                @click="block.yFixed = !block.yFixed"
              ></i>
            </a-tooltip>
          </template>
        </a-input-number>
      </a-form-item>
    </div>

    <div class="flex gap-4">
      <a-form-item label="宽度">
        <a-input-number v-model="block.w" :min="0" :max="100"> </a-input-number>
      </a-form-item>
      <a-form-item label="高度">
        <a-input-number v-model="block.h" :min="0" :max="100"> </a-input-number>
      </a-form-item>
    </div>

    <a-form-item label="背景图片">
      <a-input v-model="block.bgImage" class="group w-full" allow-clear placeholder="暂无">
        <template #prefix>
          <a-link class="!text-xs">选择</a-link>
        </template>
      </a-input>
    </a-form-item>

    <a-form-item label="背景颜色">
      <a-input v-model="block.bgColor" allow-clear placeholder="无">
        <template #prefix>
          <color-picker v-model="block.bgColor"></color-picker>
        </template>
      </a-input>
    </a-form-item>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";

defineProps({
  block: {
    type: Object as PropType<any>,
    required: true,
  },
});
</script>

<style scoped></style>
