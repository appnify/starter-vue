<template>
  <a-config-provider>
    <router-view v-slot="{ Component, route }">
      <keep-alive :include="menuStore.cacheTopNames">
        <component v-if="hasAuth(route, Component)" :is="Component"></component>
        <page-403 v-else></page-403>
      </keep-alive>
    </router-view>
  </a-config-provider>
</template>

<script setup lang="ts">
import { RouteLocationNormalizedLoaded } from "vue-router";
import { useUserStore } from "./store";
import { useMenuStore } from "./store/menu";

const userStore = useUserStore();
const menuStore = useMenuStore();

const hasAuth = (route: RouteLocationNormalizedLoaded, c: any) => {
  const aAuth = route.meta.auth;
  const uAuth = userStore.auth;
  if (!aAuth?.length) {
    return true;
  }
  if (aAuth.some((i) => i === "*")) {
    return true;
  }
  if (uAuth.some((i) => aAuth.some((j) => j === i))) {
    return true;
  }
  return false;
};
</script>

<style scoped></style>
