<template>
  <!-- <a-config-provider>
    <router-view v-slot="{ Component }">
      <page-403 v-if="Math.random() > 0.999"></page-403>
      <component v-else :is="Component"></component>
    </router-view>
  </a-config-provider> -->
  <div>
    <my-editor></my-editor>
  </div>
</template>

<script setup lang="ts">
import MyEditor from '@/components/editor/index.vue';
</script>

<style scoped></style>
