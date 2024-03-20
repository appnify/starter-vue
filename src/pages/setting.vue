<template></template>

<script lang="ts" setup>
defineOptions({
  name: 'SettingPage',
});

definePage({
  redirect: '/setting/common',
  meta: {
    title: '系统设置',
    componentName: "SettingPage",
    empty: true,
    sort: 30401,
    loading: false,
    icon: 'icon-park-outline-config',
  },
});
</script>
