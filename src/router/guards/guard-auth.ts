import { NavigationGuardWithThis } from "vue-router";
import { store, useUserStore } from "@/store";
import { Message } from "@arco-design/web-vue";

const userStore = useUserStore(store);

/**
 * 权限守卫
 * @description 校验用户是否有路由的访问权限
 */
export function useAuthGuard() {
  const whitelist = ["/404"];
  const signoutlist = ["/login"];
  const authGuard: NavigationGuardWithThis<undefined> = async function (to, from, next) {
    if (to.meta.auth === false) {
      return next();
    }
    if (whitelist.includes(to.fullPath)) {
      return next();
    }
    if (signoutlist.includes(to.fullPath)) {
      if (userStore.id) {
        Message.warning(`提示：您已登陆，如需重新请退出后再操作!`);
        return next(false);
      }
      return next();
    }
    if (!userStore.id) {
      return next("/login");
    }
    next();
  };
  return authGuard;
}
