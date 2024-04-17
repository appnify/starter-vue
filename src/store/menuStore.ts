import { MenuItem } from '@/router/menus';
import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router/auto';
import { routes } from '@/router/routes';

export interface MenuStore {
  /**
   * 完整路由列表
   */
  fullRoutesMap: Map<string, RouteRecordRaw>;
  /**
   * 当前路由列表
   */
  routes: RouteRecordRaw[];
  /**
   * 路由列表
   */
  menus: MenuItem[];
  /**
   * 首页路径
   */
  home: string;
  /**
   * 是否加载中
   */
  loading?: boolean;
  /**
   * 当前需要缓存的组件集合
   */
  cacheSet: Set<string>;
}

const treeToMap = (tree: RouteRecordRaw[], map: Map<string, RouteRecordRaw> = new Map()) => {
  for (const item of tree) {
    map.set(item.name as string, item);
    if (item.children) {
      treeToMap(item.children, map);
    }
  }
  return map;
};

export const useMenuStore = defineStore({
  id: 'menu',
  state: (): MenuStore => {
    return {
      fullRoutesMap: treeToMap(routes),
      menus: [],
      routes: routes,
      cacheSet: new Set(),
      home: '',
      loading: false,
    };
  },
  getters: {
    /**
     * 当前缓存的组件名字数组
     */
    caches(state) {
      return Array.from(state.cacheSet);
    },
  },
  actions: {
    find(path: string, menus?: MenuItem[]): MenuItem | null {
      let item: MenuItem | null = null;
      for (const menu of menus ?? this.menus) {
        if (menu.path === path) {
          item = menu;
          break;
        }
        if (menu.children) {
          item = this.find(path, menu.children);
        }
      }
      return item;
    },

    updateFromMenus(menus: MenuItem[]) {
      this;
    },
  },
});
