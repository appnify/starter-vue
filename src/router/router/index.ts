import { createRouter, createWebHashHistory } from "vue-router";
import { authGuard } from "../guards/guard-auth";
import { progressGuard } from "../guards/guard-progress";
import { titleGuard } from "../guards/guard-title";
import { routes } from "../routes";
import { baseRoutes } from "../routes/base";
import { api } from "@/api";
import { store, useUserStore } from "@/store";

/**
 * 路由实例
 */
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [...baseRoutes, ...routes],
});

/**
 * 进度条守卫
 */
router.beforeEach(progressGuard.before);
router.afterEach(progressGuard.after);

/**
 * 权限守卫
 */
router.beforeEach(authGuard);

/**
 * 标题守卫
 */
router.afterEach(titleGuard);

/**
 * 设置令牌过期处理函数
 */
api.expireHandler = () => {
  const userStore = useUserStore(store);
  const redirect = router.currentRoute.value.path;
  userStore.clearUser();
  router.push({ path: "/login", query: { redirect } });
};
