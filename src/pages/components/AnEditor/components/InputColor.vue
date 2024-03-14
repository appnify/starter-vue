<template>
  <a-input v-model="model" placeholder="例如：#0099ff">
    <template #suffix>
      <color-picker v-model="model"></color-picker>
    </template>
  </a-input>
</template>

<script setup lang="ts">
const model = defineModel<string>();
</script>

<style scoped></style>
