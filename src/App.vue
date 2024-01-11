<template>
  <a-config-provider>
    <router-view v-slot="{ Component, route }">
      <keep-alive :include="menuStore.caches">
        <component v-if="hasAuth" :is="Component"></component>
        <AnForbidden v-else></AnForbidden>
      </keep-alive>
    </router-view>
  </a-config-provider>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/store/menu';
import { useUserStore } from '@/store/user';

const route = useRoute();
const userStore = useUserStore();
const menuStore = useMenuStore();

const hasAuth = computed(() => {
  return route.matched.every(item => {
    const needAuth = item.meta.auth;
    const userAuth = userStore.auth;
    if (needAuth?.includes('*')) {
      return true;
    }
    if (!userStore.accessToken && needAuth?.includes('unlogin')) {
      return true;
    }
    if (!userStore.accessToken) {
      return false;
    }
    if (!needAuth) {
      return true;
    }
    if (userAuth.some(i => needAuth.some(j => j === i))) {
      return true;
    }
    return false;
  });
});
</script>

<style scoped></style>
