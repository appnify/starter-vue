<template>
  <a-layout class="layout">
    <a-layout-header
      class="h-13 overflow-hidden flex justify-between items-center gap-4 px-4 border-b border-slate-200 bg-white dark:bg-slate-800 dark:border-slate-700"
    >
      <div class="h-13 flex items-center border-b border-slate-200 dark:border-slate-800">
        <router-link to="/" class="ml-1 flex items-center gap-2 text-slate-700">
          <img src="/favicon.ico" alt="" width="22" height="22" class="" />
          <h1 class="relative text-lg font-semibold leading-[19px] dark:text-white m-0 p-0">
            {{ appStore.title }}
            <span
              v-if="isDev"
              class="absolute -right-14 -top-1 text-xs font-normal text-brand-500 bg-brand-50 px-1.5 rounded-full"
            >
              开发版
            </span>
          </h1>
        </router-link>
      </div>
      <div class="flex items-center gap-4">
        <a-dropdown v-if="isDev" trigger="hover">
          <a-button shape="round">
            <template #icon>
              <i class="icon-park-outline-api"></i>
            </template>
          </a-button>
          <template #content>
            <a-doption>接口文档</a-doption>
          </template>
        </a-dropdown>
        <a-tooltip v-for="btn in buttons" :key="btn.icon" :content="btn.tooltip">
          <a-button shape="round" @click="btn.onClick">
            <template #icon>
              <i :class="btn.icon"></i>
            </template>
          </a-button>
        </a-tooltip>
        <a-dropdown>
          <span class="cursor-pointer">
            <a-avatar :size="28">
              <img :src="userStore.avatar || 'https://github.com/juetan.png'" :alt="userStore.nickname" />
            </a-avatar>
            <span class="mx-2">
              {{ userStore.nickname }}
            </span>
            <i class="icon-park-outline-down"></i>
          </span>
          <template #content>
            <a-doption v-for="item in userButtons" :key="item.text" @click="item.onClick">
              <template #icon>
                <i :class="item.icon"></i>
              </template>
              {{ item.text }}
            </a-doption>
          </template>
        </a-dropdown>
        <a-drawer v-model:visible="themeConfig.visible" title="主题设置" :width="280"></a-drawer>
      </div>
    </a-layout-header>

    <a-layout class="flex flex-1 overflow-hidden">
      <a-layout-sider
        class="h-full overflow-hidden dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700"
        :width="224"
        :collapsed-width="52"
        :collapsible="true"
        :collapsed="isCollapsed"
        :hide-trigger="false"
        @collapse="onCollapse"
      >
        <a-scrollbar outer-class="h-full overflow-hidden" class="h-full overflow-hidden pt-2">
          <Menu />
        </a-scrollbar>
      </a-layout-sider>
      <a-layout class="layout-content flex-1">
        <a-layout-header class="h-8 bg-white border-b border-slate-200 dark:bg-slate-800 dark:border-slate-700">
          <div class="h-full flex items-center gap-2 px-4">
            <a-tag class="cursor-pointer">首页</a-tag>
          </div>
        </a-layout-header>
        <a-layout-content class="overflow-x-auto">
          <a-spin :loading="appStore.pageLoding" tip="正在加载中，请稍等..." class="block h-full w-full">
            <template #icon>
              <IconSync></IconSync>
            </template>
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
import { IconSync } from "@arco-design/web-vue/es/icon";

const appStore = useAppStore();
const userStore = useUserStore();
const isCollapsed = ref(false);
const route = useRoute();
const router = useRouter();
const themeConfig = ref({ visible: false });
const isDev = import.meta.env.DEV;

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
    tooltip: "切换主题色",
    onClick: () => {
      appStore.toggleDark();
    },
  },
  {
    icon: "icon-park-outline-config",
    tooltip: "打开设置",
    onClick: () => {
      themeConfig.value.visible = true;
    },
  },
];

const userButtons = [
  {
    icon: "icon-park-outline-config",
    text: "个人设置",
    onClick: () => {
      router.push("/my");
    },
  },
  {
    icon: "icon-park-outline-logout",
    text: "退出登录",
    onClick: async () => {
      userStore.clearUser();
      Message.success("提示：已退出登陆!");
      router.push({ path: "/login", query: { redirect: route.path } });
    },
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
  background-color: var(--color-fill-2);
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