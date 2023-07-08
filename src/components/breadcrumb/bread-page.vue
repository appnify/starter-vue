<template>
  <div>
    <BreadCrumb></BreadCrumb>
  <div class="mx-4 mt-4 p-4 bg-white">
    <slot></slot>
  </div>
  </div>
</template>

<script setup lang="ts">
import BreadCrumb from "./bread-crumb.vue";
</script>

<style scoped></style>
