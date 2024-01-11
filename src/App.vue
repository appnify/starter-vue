<template>
  <a-config-provider>
    <router-view v-slot="{ Component, route }">
      <keep-alive :include="menuStore.caches">
        <component v-if="hasAuth(route)" :is="Component"></component>
        <AnForbidden v-else></AnForbidden>
      </keep-alive>
    </router-view>
  </a-config-provider>
</template>

<script setup lang="ts">
import { RouteLocationNormalizedLoaded } from 'vue-router';
import { useUserStore } from '@/store/user';
import { useMenuStore } from '@/store/menu';

const userStore = useUserStore();
const menuStore = useMenuStore();

const hasAuth = (route: RouteLocationNormalizedLoaded) => {
  const neddAuth = route.meta.auth;
  const userAuth = userStore.auth;
  if (!neddAuth?.length) {
    return true;
  }
  if (neddAuth.some(i => i === '*')) {
    return true;
  }
  if (userAuth.some(i => neddAuth.some(j => j === i))) {
    return true;
  }
  return false;
};
</script>

<style scoped></style>
