<template>
  <template v-if="fileType === 'image'">
    <a-image-preview v-model:visible="show" :src="url"></a-image-preview>
  </template>
  <template v-else-if="fileType === 'video'">
    <a-modal v-model:visible="show" title="预览" title-align="start" :footer="false">
      <video :src="url" controls></video>
    </a-modal>
  </template>
  <template v-else-if="fileType === 'text'">
    <a-modal v-model:visible="show"></a-modal>
  </template>
  <template v-else-if="fileType === 'audio'">
    <a-modal v-model:visible="show" :footer="false"></a-modal>
  </template>
  <template v-else>
    <a-modal v-model:visible="show" title="预览" title-align="start" mask-animation-name="" modal-animation-name="" :closable="false" :width="420">
      抱歉，此文件类型暂不支持预览!
    </a-modal>
  </template>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { PropType } from 'vue';

type FileType = 'text' | 'audio' | 'image' | 'video' | 'unknown';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<FileType>,
  },
  url: {
    type: String,
  },
});

const fileType = computed<FileType>(() => {
  if (props.type === 'text') {
    return 'text';
  }
  if (props.type === 'image') {
    return 'image';
  }
  if (props.type === 'video') {
    return 'video';
  }
  if (props.type === 'audio') {
    return 'audio';
  }
  return 'unknown';
});

const emit = defineEmits(['update:visible']);
const show = useVModel(props, 'visible', emit);
</script>

<style scoped></style>
