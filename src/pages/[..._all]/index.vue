<template>
  <div class="w-full h-full flex justify-center items-center p-4">
    <div class="flex flex-col md:flex-row items-center">
      <div>
        <img src="./image-404.svg" alt="404" class="w-[320px]" />
      </div>
      <div class="slide-in-bottom">
        <h1 class="text-3xl font-bold my-0">404</h1>
        <p class="mt-2">抱歉，您访问的地址不存在!</p>
        <div class="space-x-3 mt-5 pb-4">
          <a-button type="primary" @click="router.back()">
            <template #icon>
              <i class="icon-park-outline-back"></i>
            </template>
            返回
          </a-button>
          <a-button type="outline" @click="router.push('/')">
            <template #icon>
              <i class="icon-park-outline-home"></i>
            </template>
            首页
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped>
.slide-in-bottom {
  animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
@keyframes slide-in-bottom {
  0% {
    transform: translateY(100px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>

<route lang="json">
{
  "meta": {
    "title": "404",
    "icon": "icon-park-outline-home"
  }
}
</route>
