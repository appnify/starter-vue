<template>
  <div>
    <div class="bg-white px-4 py-2">
      <div class="flex justify-between gap-4">
        <BreadCrumb></BreadCrumb>
        <div>
          <a-link>需要帮助？</a-link>
        </div>
      </div>
      <!-- <div class="mt-3">
        <div class="flex justify-between gap-4 font-bold">
          <span class="text-lg text-gray-900">素材列表</span>
        </div>
        <div class="text-sm text-gray-400 mt-1">
          用户上传的图片、视频、音频等素材，可用于文章、图文、视频等内容的编辑。
        </div>
      </div> -->
    </div>
    <slot name="content">
      <div class="m-4 p-4 bg-white">
        <slot></slot>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import BreadCrumb from "./bread-crumb.vue";
</script>

<style scoped></style>
