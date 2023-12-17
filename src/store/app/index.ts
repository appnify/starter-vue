import { env } from "@/config/env";
import { defineStore } from "pinia";

export const useAppStore = defineStore({
  id: "app",
  state: (): AppStore => ({
    isDarkMode: false,
    title: env.title,
    logo: "/favicon.ico",
    subtitle: env.subtitle,
    pageLoding: false,
    pageTags: [],
  }),
  actions: {
    /**
     * 切换暗/亮模式
     */
    toggleDark() {
      this.isDarkMode ? this.setLight() : this.setDark();
    },

    /**
     * 切换为亮模式
     */
    setLight() {
      document.body.setAttribute("arco-theme", "light");
      document.body.classList.remove("dark");
      this.isDarkMode = false;
    },

    /**
     * 切换为暗模式
     */
    setDark() {
      document.body.setAttribute("arco-theme", "dark");
      document.body.classList.add("dark");
      this.isDarkMode = true;
    },

    /**
     * 设置页面加载loading
     */
    setPageLoading(loading: boolean) {
      this.pageLoding = loading;
    },

    /**
     * 添加页面标签
     * @param tag 标签
     * @returns
     */
    addPageTag(tag: PageTag) {
      if (this.pageTags.some((i) => i.id === tag.id)) {
        return;
      }
      this.pageTags.push({
        closable: true,
        closible: false,
        actived: false,
        ...tag,
      });
    },

    /**
     * 移除页面标签
     * @param tag 标签
     */
    delPageTag(tag: PageTag) {
      const index = this.pageTags.findIndex((i) => i.id === tag.id);
      if (index > -1) {
        this.pageTags.splice(index, 1);
      }
    },
  },
});

interface AppStore {
  logo: string;
  /**
   * 是否为暗模式
   */
  isDarkMode: boolean;
  /**
   * 站点标题
   */
  title: string;
  /**
   * 站点副标题
   */
  subtitle: string;
  /**
   * 页面是否加载中，用于路由首次加载
   */
  pageLoding: boolean;
  /**
   * 标签数组
   */
  pageTags: PageTag[];
}

interface PageTag {
  id: string;
  title: string;
  path: string;
  closable?: boolean;
  closible?: boolean;
  actived?: boolean;
}
