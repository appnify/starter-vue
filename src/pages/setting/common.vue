<template>
  <AnPage>
    <div>
      <h2 class="m-0 text-base">常规设置</h2>
      <p class="text-gray-500 mt-1">首次为你的帐户添加密码时，你需要前往密码重置页面，以便我们验证你的身份。</p>
    </div>
    <a-form :model="{}" label-align="left" class="space-y-6 mt-6 col-form divide-y divide-gray-100">
      <a-form-item label="站点LOGO">
        <a-avatar :size="64">
          <img :src="appStore.logoUrl" alt="" />
          <template #trigger-icon>
            <i class="icon-park-outline-edit"></i>
          </template>
        </a-avatar>
        <template #help>提示：仅支持 5MB 以内大小, png 或 jpg 格式的图片 </template>
      </a-form-item>
      <a-form-item label="站点名称" class="pt-6">
        <a-input v-model="appStore.title" placeholder="请输入" class="!w-[432px]" allow-clear :max-length="24" :show-word-limit="true"></a-input>
        <template #help> 用作系统内显示的名称，可在后台修改 </template>
      </a-form-item>
      <a-form-item label="站点描述" class="pt-6">
        <a-textarea v-model="appStore.subtitle" placeholder="请输入" class="!w-[432px] h-24" :max-length="140" :show-word-limit="true"></a-textarea>
        <template #help> 启用后，消息通知将在左上角进行提示. </template>
      </a-form-item>
      <a-form-item label="站点URL" class="pt-6">
        <a-input v-model="appStore.title" placeholder="请输入" class="!w-[432px]" allow-clear></a-input>
        <template #help> 示例：https://www.juetan.cn。用于静态资源前缀、应用接口前缀等用途。 </template>
      </a-form-item>
      <a-form-item class="pt-6">
        <a-button type="primary">保存修改</a-button>
      </a-form-item>
    </a-form>
  </AnPage>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app';

defineOptions({
  name: 'CommonPage',
});

definePage({
  meta: {
    title: '常规设置',
    sort: 30400,
    icon: 'icon-park-outline-config',
  },
});

const appStore = useAppStore();
</script>

<style scoped></style>
