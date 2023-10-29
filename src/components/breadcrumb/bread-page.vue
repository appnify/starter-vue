<template>
  <div class="h-full overflow-hidden grid grid-rows-[auto_1fr]">
    <div class="bg-white px-4 py-2">
      <div class="flex justify-between gap-4">
        <BreadCrumb></BreadCrumb>
        <div>
          <a-link>需要帮助？</a-link>
        </div>
      </div>
    </div>
    <slot name="content">
      <a-scrollbar outer-class="h-full overflow-hidden" class="h-full overflow-auto" type="track">
        <div class="m-4 p-4 max-w-[1360px] mx-auto bg-white rounded overflow-hidden">
          <slot></slot>
        </div>
      </a-scrollbar>
    </slot>
  </div>
</template>

<script setup lang="ts">
import BreadCrumb from "./bread-crumb.vue";
</script>

<style scoped></style>
