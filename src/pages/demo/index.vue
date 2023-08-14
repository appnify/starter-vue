<template>
  <bread-page class="">
    <div v-for="menu in state.menus" :key="menu.id" class="mt-8">
      <div class="flex justify-between pb-1.5 border-b">
        <a-checkbox v-model="menu.checked" :indeterminate="indeter(menu.children)">
          <span class="font-semibold">
            {{ menu.title }}
          </span>
        </a-checkbox>
        <a-link> 设置权限 </a-link>
      </div>
      <div class="flex gap-4 mt-4">
        <template v-if="menu.children">
          <a-checkbox
            v-model="item.checked"
            @change="onItemChange(item, menu)"
            v-for="item in menu.children || []"
            :key="item.id"
          >
            {{ item.title }}
          </a-checkbox>
        </template>
        <template v-else>
          <div class="text-gray-400">暂无子项</div>
        </template>
      </div>
    </div>
  </bread-page>
</template>

<script setup lang="ts">
import { menus } from "@/router";
import { cloneDeep } from "lodash-es";

const items = cloneDeep(menus) as any;
for (const item of items) {
  item.checked = false;
  if (item.children) {
    for (const child of item.children) {
      child.checked = false;
    }
  }
}

const state = reactive({
  menus: items,
});

const indeter = (items: any[]) => {
  if (!items) {
    return false;
  }
  const checked = items.filter((item) => item.checked);
  return checked.length > 0 && checked.length < items.length;
};

const onItemChange = (item: any, menu: any) => {
  const checked = menu.children.filter((item: any) => item.checked);
  if (checked === 0) {
    menu.checked = false;
  } else if (checked === menu.children.length) {
    menu.checked = true;
  }
};
</script>

<style scoped></style>

<route lang="json">
{
  "meta": {
    "sort": 10201,
    "title": "表格组件",
    "icon": "icon-park-outline-add-subtract"
  },
  "parentMeta": {
    "sort": 10201,
    "title": "内置组件",
    "icon": "icon-park-outline-add-subtract"
  }
}
</route>
