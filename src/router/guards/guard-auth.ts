import { store, useUserStore } from "@/store";
import { Message } from "@arco-design/web-vue";
import { NavigationGuardWithThis } from "vue-router";

const whitelist = ["/404"];
const signoutlist = ["/login"];

export const authGuard: NavigationGuardWithThis<undefined> = async function (to, from, next) {
  // 放在外面，pinia-plugin-peristedstate 插件会失效
  const userStore = useUserStore(store);
  if (to.meta?.auth === false) {
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
  if (!userStore.accessToken) {
    return next("/login");
  }
  next();
};
