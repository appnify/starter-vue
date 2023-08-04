import { NavigationGuardWithThis } from "vue-router";
import { NProgress } from "@/plugins";

/**
 * 进度条守卫
 * @description 在路由跳转时显示进度条
 */
export const useNprogressGuard = () => {
  const before: NavigationGuardWithThis<undefined> = function (to, from, next) {
    NProgress.start();
    next();
  };
  const after: NavigationGuardWithThis<undefined> = function (to, from, next) {
    NProgress.done();
  };
  return { before, after };
};
