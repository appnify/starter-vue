import { MenuItem } from "@/router";
import { defineStore } from "pinia";

export const useMenuStore = defineStore({
  id: "menu",
  state: (): MenuStore => {
    return {
      menus: [],
      cacheAppNames: [],
      cacheTopNames: [],
      home: "",
    };
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

    /**
     * 设置顶级缓存页面
     * @param names 组件名字
     */
    setCacheTopNames(names: string[]) {
      this.cacheTopNames = names;
    },

    /**
     * 设置应用缓存页面
     * @param names 组件名字
     */
    setCacheAppNames(names: string[]) {
      this.cacheAppNames = names;
    },
  },
});

export interface MenuStore {
  /**
   * 路由列表
   */
  menus: MenuItem[];
  /**
   * KeepAlive缓存的顶级组件名字
   */
  cacheTopNames: string[];
  /**
   * KeepAlive缓存的页面组件名字
   */
  cacheAppNames: string[];
  /**
   * 首页路径
   */
  home: string;
}
