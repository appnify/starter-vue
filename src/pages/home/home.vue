<template>
  <div class="m-4">
    <a-card :bordered="false">
      <template #title>
        <div class="flex items-center">
          <i class="icon-park-outline-config mr-2"></i>
          系统参数
        </div>
      </template>
    </a-card>
  </div>
</template>

<script setup lang="tsx"></script>

<style scoped></style>

<route lang="json">
{
  "meta": {
    "sort": 10001,
    "title": "首页",
    "icon": "icon-park-outline-home"
  }
}
</route>
