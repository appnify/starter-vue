<template></template>

<script lang="ts" setup>
defineOptions({
  name: 'DevPage',
});

definePage({
  meta: {
    title: '开发工具',
    componentName: "DevPage",
    empty: true,
    sort: 120010,
    hideIn: ['prod'],
    icon: 'icon-park-outline-home',
  },
});
</script>
