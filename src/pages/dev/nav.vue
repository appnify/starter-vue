<template>
  <AnPage>
    <template #content>
      <iframe src="https://nav.juetan.cn" frameborder="0" class="w-full h-full overflow-hidden"></iframe>
    </template>
  </AnPage>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'DevNavPage',
});

definePage({
  meta: {
    title: '前端导航',
    icon: 'i-icon-park-outline-mail',
    componentName: "DevNavPage",
    sort: 120012,
    hideIn: ['prod'],
    auth: '*'
  },
});
</script>
