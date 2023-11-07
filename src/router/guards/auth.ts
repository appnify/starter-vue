import { api } from "@/api";
import { store, useUserStore } from "@/store";
import { useMenuStore } from "@/store/menu";
import { treeFind } from "@/utils/listToTree";
import { Notification } from "@arco-design/web-vue";
import { Router } from "vue-router";
import { menus } from "../menus";
import { APP_HOME_NAME } from "../routes/base";
import { APP_ROUTE_NAME, routes } from "../routes/page";

const WHITE_LIST = ["/:all(.*)*"];
const UNSIGNIN_LIST = ["/login"];

/**
 * 权限守卫
 * @param to 路由
 * @description store不能放在外面，否则 pinia-plugin-peristedstate 插件会失效
 * @returns
 */
export function useAuthGuard(router: Router) {
  api.expireHandler = () => {
    const userStore = useUserStore(store);
    const redirect = router.currentRoute.value.path;
    userStore.clearUser();
    router.push({ path: "/login", query: { redirect } });
  };

  router.beforeEach(async function (to) {
    const userStore = useUserStore(store);
    const menuStore = useMenuStore(store);
    if (to.meta.auth?.some((i) => i === "*")) {
      return true;
    }
    if (WHITE_LIST.includes(to.path)) {
      return true;
    }
    if (UNSIGNIN_LIST.includes(to.path)) {
      if (!userStore.accessToken) {
        return true;
      }
      Notification.warning({
        title: "跳转提示",
        content: `您已登陆，如需重新登陆请退出后再操作!`,
      });
      return false;
    }
    if (!userStore.accessToken) {
      return { path: "/login", query: { redirect: to.path } };
    }
    if (!menuStore.menus.length) {
      menuStore.setMenus(menus);
      menuStore.setHome(import.meta.env.VITE_HOME_PATH);
      for (const route of routes) {
        router.addRoute(route);
      }
      const home = treeFind(routes, (i) => i.path === menuStore.home);
      if (home) {
        const route = { ...home, name: APP_HOME_NAME, alias: "/" };
        router.removeRoute(home.name!);
        router.addRoute(APP_ROUTE_NAME, route);
        return router.replace(to.path);
      }
    }
    return true;
  });

  return router;
}
