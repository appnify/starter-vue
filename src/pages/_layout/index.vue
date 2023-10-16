<template>
  <a-layout class="layout">
    <a-layout-header
      class="h-13 overflow-hidden flex justify-between items-center gap-4 px-2 pr-4 bg-[#dddddd] dark:bg-slate-800"
    >
      <div class="h-13 flex items-center border-b border-slate-200 dark:border-slate-800">
        <router-link to="/" class="px-2 py-2 rounded flex items-center gap-2 text-slate-700">
          <img src="/favicon.ico" alt="" width="22" height="22" class="" />
          <h1 class="relative text-lg leading-[19px] dark:text-white m-0 p-0">
            {{ appStore.title }}
            <span
              v-if="isDev"
              class="absolute -right-14 -top-1 text-xs font-normal text-brand-500 bg-brand-50 px-1.5 rounded-full"
            >
              本地版
            </span>
          </h1>
        </router-link>
      </div>
      <div class="flex items-center gap-2">
        <div>
          <a-input-search placeholder="搜索菜单/页面" :allow-clear="true"></a-input-search>
        </div>
        <a-tooltip v-for="btn in buttons" :key="btn.icon" :content="btn.tooltip">
          <a-button @click="btn.onClick" class="!bg-transparent !hover:bg-gray-100">
            <template #icon>
              <i :class="btn.icon" class="text-base"></i>
            </template>
          </a-button>
        </a-tooltip>
        <user-dropdown></user-dropdown>
        <a-drawer v-model:visible="themeConfig.visible" title="主题设置" :width="280"></a-drawer>
      </div>
    </a-layout-header>

    <a-layout class="flex flex-1 overflow-hidden">
      <a-layout-sider
        class="h-full overflow-hidden !bg-[#f3f3f3] dark:bg-slate-800"
        :width="224"
        :collapsed-width="52"
        :collapsible="true"
        :collapsed="isCollapsed"
        :hide-trigger="false"
        :breakpoint="'lg'"
        @collapse="onCollapse"
      >
        <a-scrollbar outer-class="h-full overflow-hidden" class="h-full overflow-hidden pt-0.5">
          <Menu />
        </a-scrollbar>
        <template #trigger="{ collapsed }">
          <i
            :class="`text-gray-400 text-base ${
              collapsed ? 'icon-park-outline-expand-left' : 'icon-park-outline-expand-right'
            }`"
          ></i>
        </template>
      </a-layout-sider>
      <a-layout class="layout-content flex-1 bg-white">
        <a-layout-header class="h-8 bg-[#ececec] dark:bg-slate-800">
          <div class="h-full flex items-center justify-between gap-2 px-4">
            <div class="space-x-2">
              <a-tag
                v-for="item in appStore.pageTags"
                :key="item.id"
                :color="item.path === route.fullPath ? 'blue' : undefined"
                :closable="item.closible"
                class="cursor-pointer"
                @mouseenter="item.closable && (item.closible = true)"
                @mouseleave="item.closable && (item.closible = false)"
                @close="appStore.delPageTag(item)"
                @click="router.push(item.path)"
              >
                {{ item.title }}
              </a-tag>
            </div>
            <div>
              <a-tooltip v-for="btn in tabButtons" :key="btn.icon" :content="btn.text" position="bottom">
                <span class="px-1.5 text-gray-600 py-0.5 hover:bg-slate-100 rounded cursor-pointer">
                  <i :class="btn.icon"></i>
                </span>
              </a-tooltip>
            </div>
          </div>
        </a-layout-header>
        <a-layout-content class="overflow-x-auto">
          <a-spin :loading="appStore.pageLoding" tip="页面加载中，请稍等..." class="block h-full w-full">
            <router-view v-slot="{ Component }">
              <component :is="Component"></component>
            </router-view>
          </a-spin>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { useAppStore, useUserStore } from "@/store";
import { Message } from "@arco-design/web-vue";
import Menu from "./components/menu.vue";
import userDropdown from "./components/userDropdown.vue";

const appStore = useAppStore();
const userStore = useUserStore();
const isCollapsed = ref(false);
const route = useRoute();
const router = useRouter();
const themeConfig = ref({ visible: false });
const isDev = import.meta.env.DEV;

watch(
  () => route.path,
  () => {
    console.log("path change");
    appStore.addPageTag({
      id: route.fullPath,
      path: route.path,
      title: route.meta.title!,
    });
  },
  {
    immediate: true,
  }
);

const onCollapse = (val: boolean) => {
  isCollapsed.value = val;
};

const buttons = [
  {
    icon: "icon-park-outline-remind",
    tooltip: "通知",
    onClick: () => {
      Message.info("暂无通知");
    },
  },
  {
    icon: "icon-park-outline-moon",
    tooltip: "主题",
    onClick: () => {
      appStore.toggleDark();
    },
  },
  {
    icon: "icon-park-outline-config",
    tooltip: "设置",
    onClick: () => {
      themeConfig.value.visible = true;
    },
  },
  {
    icon: "icon-park-outline-github",
    tooltip: "仓库",
    onClick: () => {
      window.open("https://github.com/appnify/starter-vue", "_blank");
    },
  },
];

const tabButtons = [
  {
    icon: "icon-park-outline-refresh",
    text: "刷新页面",
  },
  {
    icon: "icon-park-outline-full-screen",
    text: "全屏显示",
  },
  {
    icon: "icon-park-outline-more",
    text: "更多",
  },
];

const tagItems = [
  {
    active: true,
    text: "首页",
    showClose: false,
  },
  {
    active: false,
    text: "评论管理",
    showClose: true,
  },
];
</script>

<style scoped lang="less">
@nav-size-height: 60px;
@layout-max-width: 1100px;

.layout {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.layout-navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: @nav-size-height;
}

.layout-sider {
  z-index: 99;
  height: 100%;
  overflow: hidden;
  transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);

  > :deep(.arco-layout-sider-children) {
    overflow-y: hidden;
  }
}

.menu-wrapper {
  height: 100%;
  overflow: auto;
  overflow-x: hidden;

  :deep(.arco-menu) {
    ::-webkit-scrollbar {
      width: 12px;
      height: 4px;
    }

    ::-webkit-scrollbar-thumb {
      border: 4px solid transparent;
      background-clip: padding-box;
      border-radius: 7px;
      background-color: var(--color-text-4);
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: var(--color-text-3);
    }
  }
}

.layout-content {
  // 导致部分内容被截取
  // min-height: 100vh;
  overflow-y: hidden;
  transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
}
</style>

<route lang="json">
{
  "meta": {
    "sort": 101,
    "title": "首页",
    "icon": "icon-park-outline-home"
  }
}
</route>
