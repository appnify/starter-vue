import { useDark } from "@vueuse/core";
import { defineStore } from "pinia";

export const useAppStore = defineStore({
  id: "app",
  state: () => {
    const isDark = useDark({
      onChanged: (isDark) => {
        if (isDark) {
          document.body.setAttribute("arco-theme", "dark");
          document.body.classList.add("dark");
          return;
        }
        document.body.setAttribute("arco-theme", "light");
        document.body.classList.remove("dark");
      },
    });
    return {
      count: 0,
      isDark,
      title: import.meta.env.VITE_APP_TITLE,
      subtitle: import.meta.env.VITE_APP_SUBTITLE,
    };
  },
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
  },
  actions: {
    increment() {
      this.count++;
    },
    toggleDark() {
      this.isDark = !this.isDark;
    },
  },
});
