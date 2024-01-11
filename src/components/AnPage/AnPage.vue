<template>
  <div class="grid grid-rows-[auto_1fr]">
    <div class="h-10 bg-white flex items-center gap-2 px-4">
      <router-link
        v-for="menu in menus"
        :key="menu.path"
        :to="menu.path"
        :class="route.path === menu.path ? `bg-blue-500! text-white` : null"
        class="px-2 text-gray-500 leading-[24px] rounded-sm hover:bg-gray-100"
      >
        <i :class="`${menu.icon}`"></i>
        {{ menu.title }}
      </router-link>
    </div>
    <div class="p-4">
      <div class="bg-white py-4 px-5">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { useMenuStore } from '@/store/menu';

const route = useRoute();
const menuStore = useMenuStore();

const menus = computed(() => {
  const parentPath = route.path.split('/').slice(0, -1).join('/');
  const item = menuStore.find(parentPath);
  return item?.children ?? [];
});
</script>
