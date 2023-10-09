<template>
  <div>
    <div class="border-r border-slate-200">
      <a-menu :collapsed="true">
        <a-menu-item key="0_0">
          <template #icon>
            <i class="icon-park-outline-all-application"></i>
          </template>
          组件列表
        </a-menu-item>
        <a-menu-item key="0_1">
          <template #icon>
            <i class="icon-park-outline-all-application"></i>
          </template>
          Menu 2
        </a-menu-item>
        <a-menu-item key="0_2">
          <template #icon>
            <i class="icon-park-outline-all-application"></i>
          </template>
          Menu 3
        </a-menu-item>
        <a-menu-item key="0_3">
          <template #icon>
            <i class="icon-park-outline-all-application"></i>
          </template>
          Menu 4
        </a-menu-item>
      </a-menu>
    </div>
    <div></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
