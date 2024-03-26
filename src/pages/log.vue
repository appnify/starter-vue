<template></template>

<script lang="ts" setup>
defineOptions({
  name: 'LogPage',
});

definePage({
  meta: {
    title: '日志管理',
    componentName: "LogPage",
    empty: true,
    sort: 30000,
    icon: 'i-icon-park-outline-log',
  },
});
</script>
