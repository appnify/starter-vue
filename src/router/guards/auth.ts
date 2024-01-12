import { api } from '@/api';
import { env } from '@/config/env';
import { useUserStore } from '@/store/user';
import { useMenuStore } from '@/store/menu';
import { store } from '@/store';
import { treeEach } from '@/utils/listToTree';
import { Notification } from '@arco-design/web-vue';
import { Router } from 'vue-router';
import { menus } from '../menus';
import { appRoutes } from '../routes/page';

/**
 * 权限守卫
 * @param to 路由
 * @description store不能放在外面，否则 pinia-plugin-peristedstate 插件会失效
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
    if (to.meta.auth?.includes('*')) {
      return true;
    }

    // 未登陆才能访问的页面
    if (to.meta.auth?.includes('unlogin')) {
      // 未登陆则允许通过
      if (!userStore.accessToken) {
        return true;
      }

      // 直接访问跳转回首页(非路由跳转)
      if (!from.matched.length) {
        return '/';
      }

      // 提示已登陆
      Notification.warning({
        title: '跳转提示',
        content: `您已登陆，如需重新登陆请退出后再操作!`,
      });

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
      menuStore.setMenus(menus);
      menuStore.setHome(env.homePath);

      treeEach(appRoutes, item => {
        const { cache, name } = item.meta ?? {};
        if (cache && name) {
          menuStore.caches.push(name);
        }
        // if (item.path === menuStore.home) {
        //   item.alias = '/';
        // }
        // if (!router.hasRoute(item.name!)) {
        //   const route = { ...item, children: undefined } as any;
        //   router.addRoute(route.parentName!, route);
        // }
      });

      return to.fullPath;
    }

    // 兜底处理
    return true;
  });

  return router;
}
