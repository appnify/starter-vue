import { defineStore } from "pinia";

interface PageTag {
  id: string;
  title: string;
  path: string;
  closable?: boolean;
  closible?: boolean;
  actived?: boolean;
}

export const useAppStore = defineStore({
  id: "app",
  state: () => ({
    /**
     * 是否为暗模式
     */
    isDarkMode: false,
    /**
     * 站点标题
     */
    title: import.meta.env.VITE_TITLE,
    /**
     * 站点副标题
     */
    subtitle: import.meta.env.VITE_SUBTITLE,
    /**
     * 页面是否加载中，用于路由首次加载
     */
    pageLoding: false,
    pageTags: [
      {
        id: "/",
        title: "首页",
        path: "/",
        closable: false,
        closible: false,
        actived: false,
      },
    ] as PageTag[],
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
      console.log(this.pageTags);
    },
    /**
     * 移除页面标签
     * @param tag 标签
     */
    delPageTag(tag: PageTag) {
      console.log("del page tag");
      const index = this.pageTags.findIndex((i) => i.id === tag.id);
      if (index > -1) {
        this.pageTags.splice(index, 1);
      }
    },
  },
  persist: !import.meta.env.DEV,
});
