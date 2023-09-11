<template>
  <bread-page class="">
    <a-card title="菜单权限">
      <template #title>
        菜单权限
        <a-link>展开</a-link>
      </template>
      <template #extra>
        <a-checkbox>全部选择</a-checkbox>
      </template>
      <a-tree :data="items" :block-node="true" :field-names="{ title: 'title' }" checkable :default-expand-all="true">
        <template #extra="nodeData">
          <div class="flex-1 flex justify-end px-1">
            <a-tag v-if="nodeData.children" color="orange">菜单</a-tag>
            <a-tag v-else color="green">页面</a-tag>
          </div>
        </template>
      </a-tree>
    </a-card>
  </bread-page>
</template>

<script setup lang="tsx">
import { menus } from "@/router";
import { cloneDeep } from "lodash-es";

const items = cloneDeep(menus) as any;
for (const item of items) {
  item.checked = false;
  if (item.icon) {
    const icon = item.icon;
    item.icon = () => <i class={icon}></i>;

  }
  item.switcherIcon = () => null;
  if (item.children) {
    for (const child of item.children) {
      if (child.icon) {
        const icon = child.icon;
        child.icon = () => <i class={icon}></i>;
      }
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

<style lang="less">
.arco-tree-node {
  &:hover {
    background: rgb(var(--primary-1));
  }
}
</style>

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
