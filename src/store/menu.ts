import { MenuItem, menus } from '@/router';
import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router/auto';
import { routes } from 'vue-router/auto-routes';

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
   * 当前需要缓存的组件名字
   */
  caches: string[];
}

const appRouteName = '/_app';

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
      routes: routes,
      fullRoutesMap: treeToMap(routes),
      menus: menus,
      caches: [],
      home: '',
    };
  },
  getters: {
    appRoutes(state) {
      return state.routes.find(i => i.name === appRouteName)?.children;
    },
    menusMap(state) {

    }
  },
  actions: {
    /**
     * 设置菜单
     */
    setMenus(menus: MenuItem[]) {
      this.menus = menus;
    },

    /**
     * 设置首页
     * @param path 路径
     */
    setHome(path: string) {
      this.home = path;
    },

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
      this
    }
  },
});
