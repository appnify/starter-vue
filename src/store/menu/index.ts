import { MenuItem } from "@/router";
import { defineStore } from "pinia";

export const useMenuStore = defineStore({
  id: "menu",
  state: (): MenuStore => {
    return {
      menus: [],
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
    }
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
