import { api } from '@/api';
import { store, useUserStore } from '@/store';
import { useMenuStore } from '@/store/menu';
import { treeEach, treeFilter, treeFind } from '@/utils/listToTree';
import { Notification } from '@arco-design/web-vue';
import { Router } from 'vue-router';
import { menus } from '../menus';
import { APP_HOME_NAME } from '../routes/base';
import { APP_ROUTE_NAME, routes } from '../routes/page';
import { env } from '@/config/env';

const WHITE_LIST = ['/:all(.*)*'];
const UNSIGNIN_LIST = ['/login'];

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
    router.push({ path: '/login', query: { redirect } });
  };

  router.beforeEach(async function (to, from) {
    const userStore = useUserStore(store);
    const menuStore = useMenuStore(store);

    // 手动指定直接通过
    if (to.meta.auth?.some(i => i === '*')) {
      return true;
    }

    // 在白名单内直接通过
    if (WHITE_LIST.includes(to.path)) {
      return true;
    }

    // 未登陆才能访问的页面
    if (UNSIGNIN_LIST.includes(to.path)) {
      // 未登陆则允许通过
      if (!userStore.accessToken) {
        return true;
      }

      // 已登陆进行提示
      Notification.warning({
        title: '跳转提示',
        content: `您已登陆，如需重新登陆请退出后再操作!`,
      });

      // 不是从路由跳转的，跳转回首页
      if (!from.matched.length) {
        return '/';
      }

      // 已登陆不允许
      return false;
    }

    // 未登录跳转到登陆页面
    if (!userStore.accessToken) {
      return { path: '/login', query: { redirect: to.path } };
    }

    // 未获取菜单进行获取
    if (!menuStore.menus.length) {
      // 菜单处理
      const authMenus = treeFilter(menus, item => {
        if (item.path === env.homePath) {
          item.path = '/';
        }
        return true;
      });
      menuStore.setMenus(authMenus);
      menuStore.setHome(env.homePath);

      // 路由处理
      for (const route of routes) {
        router.addRoute(route);
      }

      // 缓存处理
      const topNames: string[] = [];
      const appNames: string[] = [];
      treeEach(routes, (item, level) => {
        const { keepAlive, name } = item.meta ?? {};
        if (keepAlive && name) {
          if (level === 1) {
            topNames.push(name);
          } else {
            appNames.push(name);
          }
        }
      });
      menuStore.setCacheTopNames(topNames);
      menuStore.setCacheAppNames(appNames);

      // 首页处理
      const home = treeFind(routes, i => i.path === menuStore.home);
      if (home) {
        const route = { ...home, name: APP_HOME_NAME, alias: '/' };
        router.removeRoute(home.name!);
        router.addRoute(APP_ROUTE_NAME, route);
        return router.replace(to.path);
      }
    }

    // 兜底处理
    return true;
  });

  return router;
}
