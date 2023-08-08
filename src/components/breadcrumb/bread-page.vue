<template>
  <div>
    <BreadCrumb></BreadCrumb>
    <slot name="content">
      <div class="mx-4 mt-3 p-4 bg-white">
        <slot></slot>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import BreadCrumb from "./bread-crumb.vue";
</script>

<style scoped></style>
