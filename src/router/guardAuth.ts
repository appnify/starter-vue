import { env } from '@/config/env';
import { store } from '@/store';
import { useMenuStore } from '@/store/menu';
import { useUserStore } from '@/store/user';
import { treeEach } from '@/utils/listToTree';
import { Message } from '@arco-design/web-vue';
import { Router } from 'vue-router/auto';
import { mapRoutesToMenus } from './menus';
import { APP_ROUTE_NAME, getAppRoutes, routes } from './routes';
import { axios } from '@/utils/axios';

/**
 * 权限守卫
 * @param to 路由
 * @description store不能放在外面，否则 pinia-plugin-peristedstate 插件会失效
 */
export function useAuthGuard(router: Router) {
  axios.onLogout = () => {
    const userStore = useUserStore(store);
    const redirect = router.currentRoute.value.path;
    userStore.clearUser();
    router.push({ path: '/login', query: { redirect } });
  };

  router.beforeEach(async function (to, from) {
    const userStore = useUserStore(store);
    const menuStore = useMenuStore(store);

    // 无需权限
    if (to.meta.auth?.includes('*')) {
      return true;
    }

    // 未登陆才能访问的页面
    if (to.meta.auth?.includes('unauth')) {
      // 未登陆则允许通过
      if (!userStore.accessToken) {
        return true;
      }

      // 直接访问跳转回首页(非路由跳转)
      if (!from.matched.length) {
        return '/';
      }

      // 提示已登陆
      Message.warning(`您已登陆，如需重新登陆请退出后再操作!`);

      // 已登陆不允许
      return false;
    }

    // 未登录跳转到登陆页面
    if (!userStore.accessToken) {
      return {
        path: '/login',
        query: { redirect: to.path },
      };
    }

    // 未获取权限进行获取
    if (!menuStore.menus.length) {
      const appRoutes = getAppRoutes(routes);
      const menus = mapRoutesToMenus(appRoutes);
      const appRoute = menuStore.fullRoutesMap.get(APP_ROUTE_NAME)!;
      menuStore.menus = menus;
      menuStore.home = env.homePath;

      for (const route of router.getRoutes()) {
        if ((route.name as string).startsWith('/_')) {
          continue;
        }
        if (router.hasRoute(route.name!)) {
          console.log('has:', route.name);
          router.removeRoute(route.name!);
        }
      }

      router.addRoute({ ...appRoute, children: [] });

      treeEach(menuStore.menus, menu => {
        const route = menuStore.fullRoutesMap.get(menu.name);
        const parentName = menu.parentName ?? APP_ROUTE_NAME;
        if (!route) {
          return;
        }
        if (menu.cache) {
          menuStore.cacheSet.add(menu.cache);
        }
        router.addRoute(parentName, route);
      });

      return to.fullPath;
    }

    return true;
  });

  return router;
}
