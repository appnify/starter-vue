<template>
  <div class="mt-4 mx-5">
    <a-breadcrumb>
      <a-breadcrumb-item>
        <i class="icon-park-outline-all-application text-gray-400"></i>
      </a-breadcrumb-item>
      <a-breadcrumb-item v-for="(item, index) in items" :key="item">
        <span
          :class="
            index !== items.length - 1 ? 'text-gray-400' : 'text-gray-500'
          "
        >
          {{ item }}
        </span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { MenuItem, menus } from "@/router";

const route = useRoute();
const getPaths = (items: MenuItem[], path: string, paths: string[] = []) => {
  const item = items.find((i) => {
    if (i.id.endsWith("index")) {
      return i.id.includes(path);
    }
    return path.includes(i.id) && path.includes(i.path);
  });
  if (item) {
    paths.push(item.title as string);
    if (item.children?.length) {
      getPaths(item.children, path, paths);
    }
  }
  return paths;
};

const items = computed(() => getPaths(menus, route.path));
</script>

<style scoped></style>
