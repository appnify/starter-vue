<template>
  <bread-page>
    <template #content>
      <iframe
        src="https://apifox.com/apidoc/shared-f1ea65e6-cee8-4fe3-949f-288a7cd1af49"
        frameborder="0"
        class="w-full h-full"
      ></iframe>
    </template>
  </bread-page>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped></style>

<route lang="json">
{
  "only": "dev",
  "meta": {
    "sort": 20010,
    "title": "接口文档",
    "icon": "icon-park-outline-api"
  }
}
</route>
