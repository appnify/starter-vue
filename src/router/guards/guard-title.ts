import { NavigationGuardWithThis } from "vue-router";

/**
 * 标题首位
 * @description 路由跳转后更新页面标题
 */
export const useTitleGuard = () => {
  const titleGuard: NavigationGuardWithThis<undefined> = function (to, from, next) {
    const title = to.meta.title || import.meta.env.VITE_APP_TITLE;
    const subtitle = import.meta.env.VITE_APP_SUBTITLE;
    document.title = `${title} | ${subtitle}`;
    next();
  };
  return titleGuard;
};
