<template>
  <a-input v-model="model" class="group w-full" allow-clear placeholder="例如: a.com/b.png">
    <template #suffix>
      <a-link @click="visible = true">选择</a-link>
    </template>
  </a-input>
  <image-picker v-model="model" v-model:visible="visible"></image-picker>
</template>

<script setup lang="ts">
import ImagePicker from "./ImagePicker.vue";

const model = defineModel<string>();
const visible = ref(false);
</script>

<style scoped></style>
