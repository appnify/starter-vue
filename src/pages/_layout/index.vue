<template>
  <a-layout class="layout">
    <a-layout-header
      class="h-13 overflow-hidden flex justify-between items-center gap-4 px-2 pr-4 border-b border-slate-200 bg-white dark:bg-slate-800 dark:border-slate-700"
    >
      <div class="h-13 flex items-center">
        <router-link to="/" class="px-2 flex items-center gap-2 text-slate-700">
          <img src="/favicon.ico" alt="" width="24" height="24" class="" />
          <h1 class="relative text-[22px] leading-[22px] dark:text-white m-0 p-0 font-normal">
            {{ appStore.title }}
            <span class="absolute -right-10 -top-1 font-normal text-xs text-gray-400"> v0.0.1 </span>
          </h1>
        </router-link>
      </div>
      <div class="flex items-center gap-2">
        <div>
          <a-input-search placeholder="搜索菜单/页面" :allow-clear="true"></a-input-search>
        </div>
        <a-tooltip content="上传文件">
          <a-button @click="() => null" class="!bg-transparent !hover:bg-gray-100">
            <template #icon>
              <a-badge :count="1" :dot="true">
                <i class="text-base icon-park-outline-upload-one"></i>
              </a-badge>
            </template>
          </a-button>
        </a-tooltip>
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
        class="h-full overflow-hidden dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700"
        :width="224"
        :collapsed-width="52"
        :collapsible="true"
        :collapsed="isCollapsed"
        :hide-trigger="false"
        @collapse="val => (isCollapsed = val)"
      >
        <a-scrollbar outer-class="h-full overflow-hidden" class="h-full overflow-hidden pt-1">
          <Menu />
        </a-scrollbar>
        <template #trigger="{ collapsed }">
          <i
            :class="collapsed ? `icon-park-outline-expand-left` : 'icon-park-outline-expand-right'"
            class="text-gray-400 text-base hover:text-gray-700"
          ></i>
        </template>
      </a-layout-sider>
      <a-layout class="layout-content flex-1">
        <a-layout-content class="overflow-x-auto">
          <a-spin :loading="appStore.pageLoding" tip="页面加载中，请稍等..." class="block h-full w-full">
            <template #icon>
              <IconSync></IconSync>
            </template>
            <router-view v-slot="{ Component }">
              <keep-alive :include="menuStore.cacheAppNames">
                <component v-if="!appStore.pageLoding" :is="Component"></component>
              </keep-alive>
            </router-view>
          </a-spin>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store';
import { useMenuStore } from '@/store/menu';
import { Message } from '@arco-design/web-vue';
import { IconSync } from '@arco-design/web-vue/es/icon';
import Menu from './components/menu.vue';
import userDropdown from './components/userDropdown.vue';

defineOptions({ name: 'LayoutPage' });

const appStore = useAppStore();
const menuStore = useMenuStore();
const isCollapsed = ref(false);
const themeConfig = ref({ visible: false });

const buttons = [
  {
    icon: 'icon-park-outline-remind',
    tooltip: '通知',
    onClick: () => {
      Message.info('暂无通知');
    },
  },
  {
    icon: 'icon-park-outline-config',
    tooltip: '设置',
    onClick: () => {
      themeConfig.value.visible = true;
    },
  },
  {
    icon: 'icon-park-outline-github',
    tooltip: '仓库',
    onClick: () => {
      window.open('https://github.com/appnify/starter-vue', '_blank');
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
  background-color: #e4ebf1;
  transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
}
</style>

<route lang="json">
{
  "meta": {
    "name": "LayoutPage",
    "sort": 101,
    "title": "概览",
    "icon": "icon-park-outline-home",
    "keepAlive": true
  }
}
</route>
