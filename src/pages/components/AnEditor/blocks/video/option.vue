<template>
  <div>
    <base-option v-model="model"></base-option>
  </div>
  <a-divider></a-divider>

  <a-form-item label="视频来源">
    <a-radio-group v-model="model.params.type" direction="vertical" class="bg-gray-100 w-full px-2 py-1 rounded">
      <a-radio value="live"> 使用直播地址 </a-radio>
      <a-radio value="file"> 使用视频列表 </a-radio>
    </a-radio-group>
  </a-form-item>

  <a-form-item v-if="model.params.type === 'live'" label="直播地址">
    <a-input v-model="model.params.url"></a-input>
  </a-form-item>

  <a-form-item v-if="model.params.type === 'file'" :label-attrs="{ class: 'flex-1' }">
    <template #label>
      <div class="flex items-center justify-between gap-2">
        <span>视频列表</span>
        <span class="pr-3">
          <a-link @click="showImagePicker = true">选择</a-link>
        </span>
      </div>
    </template>
    <ul v-if="model.params.videos.length" class="list-none p-0 m-0 space-y-1">
      <li
        v-for="(item, index) in model.params.videos"
        :key="item.id"
        class="group flex items-center justify-between gap-2 px-3 h-8 bg-gray-100"
      >
        <span class="hover:text-brand-500 cursor-pointer" @click="onPreviewImage(index)">
          <i class="icon-park-outline-picture mr-1"></i>
          {{ item.title }}
        </span>
        <span class="text-red-400 cursor-pointer hover:text-red-700" @click="onRemoveImage(item, index)">
          <i class="hidden! group-hover:inline-block! icon-park-outline-delete"></i>
        </span>
      </li>
    </ul>
    <div v-else class="text-gray-400 px-3 h-8 bg-gray-100 flex items-center">暂未选择任何视频</div>
  </a-form-item>

  <a-form-item label="视频比例">
    <a-radio-group
      v-model="model.params.fit"
      :options="fitOptions"
      direction="vertical"
      class="bg-gray-100 w-full px-2 py-1 rounded"
    >
    </a-radio-group>
  </a-form-item>

  <ImagePicker :multiple="true" v-model:visible="showImagePicker" v-model="model.params.videos"></ImagePicker>
  <a-image-preview-group
    v-model:visible="showImagePreview"
    v-model:current="imageIndex"
    :src-list="imageList"
  ></a-image-preview-group>
</template>

<script setup lang="ts">
import { delConfirm } from '@/utils';
import BaseOption from '../../components/BaseOption.vue';
import ImagePicker from '../../components/ImagePicker.vue';
import { Video } from './interface';
import { fitOptions } from '../image/interface';

const model = defineModel<Video>({ required: true });
const showImagePicker = ref(false);
const showImagePreview = ref(false);
const imageList = computed(() => model.value.params.videos.map(i => i.url));
const imageIndex = ref(0);

const onPreviewImage = (index: number) => {
  imageIndex.value = index;
  showImagePreview.value = true;
};

const onRemoveImage = async (item: any, index: number) => {
  await delConfirm({
    content: '确定删除该图片吗?',
    okText: '确定删除',
  });
  model.value.params.videos.splice(index, 1);
};
</script>

<style lang="less" scoped>
.dir-radio {
  .arco-radio-button-content {
    padding: 0;
  }
}
</style>
../components/font ../font
