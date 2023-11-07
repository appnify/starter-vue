import { store, useUserStore } from "@/store";
import { Notification } from "@arco-design/web-vue";
import { NavigationGuardWithThis } from "vue-router";

const WHITE_LIST = ["/:all(.*)*"];
const UNSIGNIN_LIST = ["/login"];

// store不能放在外面，否则 pinia-plugin-peristedstate 插件会失效
export const authGuard: NavigationGuardWithThis<undefined> = async function (to) {
  const userStore = useUserStore(store);
  if (to.meta.auth?.some((i) => i === "*")) {
    return true;
  }
  if (WHITE_LIST.includes(to.path)) {
    return true;
  }
  if (UNSIGNIN_LIST.includes(to.path)) {
    if (userStore.accessToken) {
      Notification.warning({
        title: "跳转提示",
        content: `提示：您已登陆，如需重新登陆请退出后再操作!`,
      });
      return false;
    }
    return true;
  }
  if (!userStore.accessToken) {
    return { path: "/login", query: { redirect: to.path } };
  }
  return true;
};
