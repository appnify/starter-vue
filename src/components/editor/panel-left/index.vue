<template>
  <div class="h-full grid grid-cols-[auto_1fr]" :style="{ width: !collapsed ? '248px' : undefined }">
    <div class="h-full grid grid-rows-[1fr_auto] border-r border-slate-200">
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
      <div class="w-full justify-center gap-1 grid text-center pb-4">
        <a-tooltip content="帮助" position="right">
          <a-button type="text">
            <template #icon>
              <i class="icon-park-outline-info text-lg text-gray-400 hover:text-gray-700"></i>
            </template>
          </a-button>
        </a-tooltip>
        <a-tooltip :content="collapsed ? '展开' : '折叠'" position="right">
          <a-button type="text" @click="collapsed = !collapsed">
            <template #icon>
              <i
                class="text-lg text-gray-400 hover:text-gray-700"
                :class="collapsed ? 'icon-park-outline-expand-left' : 'icon-park-outline-expand-right'"
              ></i>
            </template>
          </a-button>
        </a-tooltip>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
const collapsed = ref(false);
</script>

<style scoped></style>
