import { defineStore } from "pinia";
import { MenuItem } from "@/router";

export const useMenuStore = defineStore({
  id: "menu",
  state: (): MenuStore => {
    return {
      menus: [],
      home: "/",
    };
  },
  actions: {
    /**
     * 设置菜单
     */
    setMenus(menus: MenuItem[]) {
      this.menus = menus;
    },
  },
});

export interface MenuStore {
  /**
   * 路由列表
   */
  menus: MenuItem[];
  /**
   * 首页路径
   */
  home: string;
}
