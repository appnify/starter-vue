import { store, useUserStore } from "@/store";
import { Message } from "@arco-design/web-vue";
import { NavigationGuardWithThis } from "vue-router";

const whitelist = ["/:all(.*)*"];
const signoutlist = ["/login"];

export const authGuard: NavigationGuardWithThis<undefined> = async function (to) {
  // 放在外面，pinia-plugin-peristedstate 插件会失效
  const userStore = useUserStore(store);
  if (to.meta?.auth === false) {
    return true;
  }
  if (whitelist.includes(to.path) || to.name === "_all") {
    return true;
  }
  if (signoutlist.includes(to.path)) {
    if (userStore.accessToken) {
      Message.warning(`提示：您已登陆，如需重新请退出后再操作!`);
      return false;
    }
    return true;
  }
  if (!userStore.accessToken) {
    return {
      path: "/login",
      query: {
        redirect: to.path,
      },
    };
  }
  return true;
};
