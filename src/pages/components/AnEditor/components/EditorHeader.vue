<template>
  <div class="h-full flex items-center justify-between pl-2 pr-4">
    <div class="text-base flex items-center group">
      <a-link @click="emit('exit')">
        <template #icon>
          <i class="icon-park-outline-back"></i>
        </template>
        返回
      </a-link>
      <a-divider :direction="'vertical'" :margin="8"></a-divider>
      <ani-texter v-model="container.title"></ani-texter>
      <component v-for="item in HL" :is="item" />
      <!-- <a-tag :color="container.id ? 'blue' : 'green'" class="mr-2 ml-1">
        {{ container.id ? '修改' : '新增' }}
      </a-tag> -->
    </div>
    <div class="flex gap-2">
      <component v-for="item in HR" :key="item.name" :is="item" />
      <a-button @click="emit('preview')">
        <template #icon>
          <i class="icon-park-outline-play"></i>
        </template>
        预览
      </a-button>
      <!-- <a-button @click="emit('config')">
        <template #icon>
          <i class="icon-park-outline-config"></i>
        </template>
        设置
      </a-button> -->
      <a-button type="primary" :loading="saving" @click="emit('save')">
        <template #icon>
          <i class="icon-park-outline-save"></i>
        </template>
        保存
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Container } from '../core';
import { ContextKey } from '../core/plugin';
import AniTexter from './InputTexter.vue';

defineProps({
  saving: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits(['preview', 'config', 'exit', 'save']);
const container = defineModel<Container>('container', { required: true });

const { HR, HL } = inject(ContextKey)!
</script>

<style scoped></style>
../core
