<template>
  <div>
    <div class="bg-white px-4 py-2">
      <div class="flex justify-between gap-4">
        <BreadCrumb></BreadCrumb>
        <div>
          <a-link>需要帮助？</a-link>
        </div>
      </div>
    </div>
    <slot name="content">
      <div class="m-4 p-4 bg-white">
        <slot></slot>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import BreadCrumb from "./bread-crumb.vue";
</script>

<style scoped></style>
