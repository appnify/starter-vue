<template>
  <AnPage> </AnPage>
</template>

<script setup lang="tsx">
defineOptions({
  name: 'SystemLogoPage',
});

definePage({
  meta: {
    title: '操作日志',
    icon: 'i-icon-park-outline-doc-detail',
    componentName: 'SystemLogoPage',
    sort: 10304,
    auth: 'log_operation_page'
  },
});
</script>

<style scoped></style>
