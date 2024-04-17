<template>
  <AnPage>
    <template #content>
      <iframe :src="url" frameborder="0" class="w-full h-full"></iframe>
    </template>
  </AnPage>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DevOpenpiPage',
})

definePage({
  meta: {
    title: '接口文档',
    icon: 'i-icon-park-outline-api',
    componentName: 'DevOpenpiPage',
    sort: 120010,
    hideInd: ['prod'],
    auth: '*',
  },
})

const url = 'https://apifox.com/apidoc/shared-f1ea65e6-cee8-4fe3-949f-288a7cd1af49'
</script>

<style lang="less" scoped></style>
