import { Router } from 'vue-router';
import { NProgress } from '@/plugins';

/**
 * 设置进度条
 * @param router 路由实例
 */
export const useNprogress = (router: Router) => {
  router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
  });

  router.afterEach(() => {
    NProgress.done();
  });
};

/**
 * 设置文档标题
 * @param router 路由实例
 */
export const useTitle = (router: Router) => {
  router.beforeEach((to, from, next) => {
    const title = to.meta.title || import.meta.env.VITE_APP_TITLE;
    const subtitle = import.meta.env.VITE_APP_SUBTITLE;
    document.title = `${title} | ${subtitle}`;
    next();
  });
};

/**
 * 设置权限
 * @param router 路由实例
 */
export const useAuth = (router: Router) => {
  router.beforeEach((to, from, next) => {
    if (to.meta.auth) {
    }
    next();
  });
};
