import { defineStore } from "pinia";

export const useAppStore = defineStore({
  id: "app",
  state: () => ({
    isDarkMode: false,
    title: import.meta.env.VITE_TITLE,
    subtitle: import.meta.env.VITE_SUBTITLE,
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
  },
  persist: true,
});
