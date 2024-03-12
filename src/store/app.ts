import { env } from '@/config/env';
import { defineStore } from 'pinia';

export interface AppStore {
  /**
   * 站点标题
   */
  title: string;
  /**
   * 站点副标题
   */
  subtitle: string;
  /**
   * 图标地址
   */
  logoUrl: string;
  /**
   * 是否为暗模式
   */
  isDarkMode: boolean;
  /**
   * 是否加载中
   * @description
   * 仅在页面首次加载时显示
   */
  pageLoding: boolean;
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppStore => {
    return {
      isDarkMode: false,
      title: env.title,
      logoUrl: '/favicon.ico',
      subtitle: env.subtitle,
      pageLoding: false,
    };
  },
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
      document.body.setAttribute('arco-theme', 'light');
      document.body.classList.remove('dark');
      this.isDarkMode = false;
    },

    /**
     * 切换为暗模式
     */
    setDark() {
      document.body.setAttribute('arco-theme', 'dark');
      document.body.classList.add('dark');
      this.isDarkMode = true;
    },

    /**
     * 设置页面加载loading
     */
    setPageLoading(loading: boolean) {
      this.pageLoding = loading;
    },
  },
});
