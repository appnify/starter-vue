<template>
  <a-config-provider>
    <router-view v-slot="{ Component }">
      <page-403 v-if="Math.random() > 0.99"></page-403>
      <component v-else :is="Component"></component>
    </router-view>
  </a-config-provider>
</template>

<script setup lang="ts">
</script>

<style scoped></style>
