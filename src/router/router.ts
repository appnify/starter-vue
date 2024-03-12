import { createRouter, createWebHistory } from 'vue-router/auto';
import { useAuthGuard } from './guardAuth';
import { useProgressGard } from './guardProgress';
import { useTitleGuard } from './guardTitle';
import { routes, RouteNamedMap } from 'vue-router/auto-routes';

/**
 * 路由实例
 */
export const router = createRouter({
  history: createWebHistory(),
});

/**
 * 进度条守卫
 */
useProgressGard(router);

/**
 * 权限守卫
 */
// useAuthGuard(router);

/**
 * 标题守卫
 */
useTitleGuard(router);
