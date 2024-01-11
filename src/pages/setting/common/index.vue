<template>
  <bread-page>
    <a-form :model="{}" :label-col-props="{ span: 3 }" label-align="left" layout="vertical">
      <a-form-item label="站点LOGO">
        <a-avatar :size="64">
          <img :src="appStore.logo" alt="" />
          <template #trigger-icon>
            <i class="icon-park-outline-edit"></i>
          </template>
        </a-avatar>
        <template #help>提示：仅支持 5MB 以内大小, png 或 jpg 格式的图片 </template>
      </a-form-item>
      <a-form-item label="站点名称">
        <a-input
          v-model="appStore.title"
          placeholder="请输入"
          class="!w-[432px]"
          allow-clear
          :max-length="24"
          :show-word-limit="true"
        ></a-input>
        <template #help> 用作系统内显示的名称，可在后台修改 </template>
      </a-form-item>
      <a-form-item label="站点描述">
        <a-textarea
          v-model="appStore.subtitle"
          placeholder="请输入"
          class="!w-[432px] h-24"
          :max-length="140"
          :show-word-limit="true"
        ></a-textarea>
        <template #help> 启用后，消息通知将在左上角进行提示. </template>
      </a-form-item>
      <a-form-item label="站点URL">
        <a-input v-model="appStore.title" placeholder="请输入" class="!w-[432px]" allow-clear></a-input>
        <template #help> 示例：https://www.juetan.cn。用于静态资源前缀、应用接口前缀等用途。 </template>
      </a-form-item>
      <a-form-item>
        <a-button type="primary">保存修改</a-button>
      </a-form-item>
    </a-form>
  </bread-page>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app';

const appStore = useAppStore();
</script>

<style scoped></style>

<route lang="json">
{
  "meta": {
    "sort": 30400,
    "title": "常规设置",
    "icon": "icon-park-outline-config"
  }
}
</route>
