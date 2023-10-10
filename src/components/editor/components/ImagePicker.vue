<template>
  <a-modal title="选择图片" v-model:visible="visible" title-align="start" :closable="false">
    <div class="flex flex-wrap gap-4">
      <div v-for="item in images" :key="item" class="w-24 h-24 bg-gray-200 flex items-center justify-center">
        <img :src="item" class="w-full h-full object-cover" />
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
const visible = ref(false);
const images = ref([]);
</script>

<style scoped></style>
