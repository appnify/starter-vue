import { defineStore } from "pinia";

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
    }
  },
  persist: !import.meta.env.DEV,
});
