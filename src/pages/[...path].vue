<template>
  <div class="w-full h-full flex justify-center items-center p-4">
    <div class="flex flex-col md:flex-row items-center">
      <div v-html="Image404"></div>
      <div class="slide-in-bottom">
        <h1 class="text-3xl font-bold my-0">404</h1>
        <p class="mt-2">页面不存在，请检查地址或联系管理员!</p>
        <div class="space-x-3 mt-5 pb-4">
          <a-button type="primary" @click="router.back()">
            <template #icon>
              <i class="i-icon-park-outline-back"></i>
            </template>
            返回
          </a-button>
          <a-button type="outline" @click="router.push('/')">
            <template #icon>
              <i class="i-icon-park-outline-home"></i>
            </template>
            首页
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import Image404 from '@/assets/404.svg?raw';

defineOptions({
  name: 'NotFoundPage',
});

definePage({
  meta: {
    title: '404',
    componentName: "NotFoundPage",
    auth: ['*'],
    icon: 'i-icon-park-outline-home',
  },
});

const router = useRouter();
</script>

<style scoped></style>
