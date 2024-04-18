<template>
  <a-layout class="layout">
    <a-layout-header class="h-13 overflow-hidden flex justify-between items-center gap-4 px-2 pr-4 border-b border-slate-200 bg-white dark:bg-slate-800 dark:border-slate-700">
      <div class="h-13 flex items-center">
        <router-link to="/" class="px-2 flex items-center gap-2 text-slate-700 hover:text-brand-600">
          <img :src="appStore.logoUrl" :alt="appStore.title" width="24" height="24" class="" />
          <h1 class="relative text-[18px] leading-[22px] dark:text-white m-0 p-0 font-normal">
            {{ appStore.title }}
          </h1>
          <a-tag size="small" bordered>v0.0.1</a-tag>
        </router-link>
      </div>
      <div class="flex items-center gap-2">
        <a-tooltip v-for="btn in buttons" :key="btn.icon" :content="btn.tooltip">
          <a-button @click="btn.onClick" class="!bg-transparent !hover:bg-gray-200">
            <template #icon>
              <i :class="btn.icon" class="text-base"></i>
            </template>
          </a-button>
        </a-tooltip>
        <app-user></app-user>
        <a-drawer v-model:visible="themeConfig.visible" title="主题设置" :width="280"></a-drawer>
      </div>
    </a-layout-header>

    <a-layout class="flex flex-1 overflow-hidden">
      <a-layout-sider
        class="h-full overflow-hidden dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700"
        :width="216"
        :collapsed-width="49"
        :collapsible="true"
        :collapsed="isCollapsed"
        :hide-trigger="false"
        @collapse="val => (isCollapsed = val)"
      >
        <a-scrollbar outer-class="h-full overflow-hidden" class="h-full overflow-hidden">
          <AppMenu />
        </a-scrollbar>
        <template #trigger="{ collapsed }">
          <div class="w-full h-full py-1 px-1 flex justify-between items-center gap-2" @click.stop>
            <div
              class="inline-block w-10 h-10 h-full rounded flex items-center justify-center hover:bg-gray-200 text-base text-gray-400"
              @click="() => (isCollapsed = !isCollapsed)"
            >
              <i :class="collapsed ? `i-icon-park-outline-expand-left` : 'i-icon-park-outline-expand-right'"></i>
            </div>
          </div>
        </template>
      </a-layout-sider>
      <a-layout class="layout-content flex-1">
        <a-layout-content class="overflow-x-auto">
          <a-spin :loading="appStore.pageLoding" class="block h-full w-full">
            <router-view v-slot="{ Component }">
              <keep-alive :include="menuStore.caches">
                <AnForbidden v-if="!hasAuth"></AnForbidden>
                <AnPage v-else-if="route.meta.wrap">
                  <component :is="Component"></component>
                </AnPage>
                <component v-else :is="Component"></component>
              </keep-alive>
            </router-view>
          </a-spin>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="tsx" setup>
import { AuthKey } from '@/config/auths'
import AppMenu from '@/pages/components/AppMenu.vue'
import AppUser from '@/pages/components/AppUser.vue'
import { useAppStore } from '@/store/appStore'
import { useMenuStore } from '@/store/menuStore'
import { useUserStore } from '@/store/userStore'
import { Message } from '@arco-design/web-vue'
import { useFullscreen } from '@vueuse/core'

defineOptions({
  name: 'AppPage',
})

definePage({
  redirect: '/',
  meta: {
    title: '首页',
    componentName: 'AppPage',
    sort: 101,
    cache: 'AppPage',
    icon: 'i-icon-park-outline-home',
  },
})

const route = useRoute()
const appStore = useAppStore()
const menuStore = useMenuStore()
const userStore = useUserStore()
const isCollapsed = ref(false)
const themeConfig = ref({ visible: false })
const { toggle, isSupported } = useFullscreen()

const hasAuth = computed(() => userStore.auths[route.meta.auth as AuthKey])

const buttons = [
  {
    icon: 'i-icon-park-outline-remind',
    tooltip: '通知',
    onClick: () => {
      Message.info('暂无通知')
    },
  },
  {
    icon: 'i-icon-park-outline-full-screen',
    tooltip: '全屏',
    onClick: () => {
      if (!isSupported) {
        Message.info('您的浏览器不支持全屏')
        return
      }
      toggle()
    },
  },
  {
    icon: 'i-icon-park-outline-github',
    tooltip: '仓库',
    onClick: () => {
      window.open('https://github.com/appnify/starter-vue', '_blank')
    },
  },
  {
    icon: 'i-icon-park-outline-config',
    tooltip: '设置',
    onClick: () => {
      themeConfig.value.visible = true
    },
  },
]
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
  overflow-y: hidden;
  background-color: #e4ebf1;
  transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
}
</style>
@/store/user/user @/store/appStore@/store/menuStore@/store/userStore
