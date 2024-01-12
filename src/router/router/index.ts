import { createRouter } from 'vue-router';
import { useAuthGuard } from '../guards/auth';
import { useProgressGard } from '../guards/progress';
import { useTitleGuard } from '../guards/title';
import { historyMode } from './util';
import { routes } from '../routes/page';

/**
 * 路由实例
 */
export const router = createRouter({
  history: historyMode(),
  routes: routes,
});

/**
 * 进度条守卫
 */
useProgressGard(router);

/**
 * 权限守卫
 */
useAuthGuard(router);

/**
 * 标题守卫
 */
useTitleGuard(router);
