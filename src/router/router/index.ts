import { createRouter } from "vue-router";
import { useAuthGuard } from "../guards/auth";
import { useProgressGard } from "../guards/progress";
import { useTitleGuard } from "../guards/title";
import { baseRoutes } from "../routes/base";
import { historyMode } from "./util";

/**
 * 路由实例
 */
export const router = createRouter({
  history: historyMode(),
  routes: [...baseRoutes],
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
