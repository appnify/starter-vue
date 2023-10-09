<template>
  <div class="h-full flex items-center justify-between px-4">
    <div class="text-base group">
      <a-tag color="green" bordered class="mr-1.5"> 新增 </a-tag>前端编辑器
      <i class="icon-park-outline-edit text-gray-400 hover:text-gray-700 ml-1"></i>
    </div>
    <div class="flex gap-2">
      <a-button> 导出 </a-button>
      <a-button> 设置 </a-button>
      <a-dropdown-button type="primary">
        保存
        <template #content>
          <a-doption>保存为JSON</a-doption>
          <a-doption>保存为图片</a-doption>
        </template>
      </a-dropdown-button>
      <a-button status="danger">退出</a-button>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
