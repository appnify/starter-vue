import { env } from '@/config/env'
import { store } from '@/store'
import { useMenuStore } from '@/store/menuStore'
import { useUserStore } from '@/store/userStore'
import { treeEach } from '@/utils/listToTree'
import { Message } from '@arco-design/web-vue'
import { RouteRecordRaw, Router } from 'vue-router/auto'
import { MenuItem, mapRoutesToMenus } from './menus'
import { APP_ROUTE_NAME, routesMap } from './routes'
import { axios } from '@/utils/axios'
import { AuthKey } from '@/config/auths'

export function setRoutesByMenus(router: Router, menus: MenuItem[]) {
  const app = routesMap.get(APP_ROUTE_NAME)
  if (!app) {
    return
  }
  router.addRoute({ ...app, children: [] })
  treeEach(menus, menu => {
    const route = routesMap.get(menu.routeName)
    if (!route) {
      return
    }
    const parentName = menu.routeParentName ?? APP_ROUTE_NAME
    const { routeName: name, routeAlias: alias, routeParentName, path, ...meta } = menu
    const newRoute: RouteRecordRaw = {
      ...route,
      meta: {
        ...(route.meta ?? {}),
        ...meta,
      },
      name,
      path,
    }
    if (alias) {
      newRoute.alias = alias
    }
    router.addRoute(parentName, newRoute)
  })
}

/**
 * 权限守卫,store不能放在外面，否则 pinia-plugin-peristedstate 插件会失效
 */
export function useAuthGuard(router: Router) {
  axios.onLogout = () => {
    const userStore = useUserStore(store)
    const redirect = router.currentRoute.value.path
    userStore.$reset()
    router.push({ path: '/login', query: { redirect } })
  }

  router.beforeEach(async function (to, from) {
    const userStore = useUserStore(store)

    if (to.meta.auth === '*') {
      return true
    }

    if (to.meta.auth === 'logout') {
      if (!userStore.id) {
        return true
      }
      Message.warning(`您已登陆，请先退出`)
      return from.matched.length ? false : '/'
    }

    if (!userStore.id) {
      Message.warning(`尚未登录，请先登录`)
      return {
        path: '/login',
        query: { redirect: to.path },
      }
    }

    if (!userStore.roleName) {
      userStore.roleName = '管理员'
      userStore.auths = { ...auths }
      userStore.menus = mapRoutesToMenus(routesMap.get(APP_ROUTE_NAME)!.children!)

      setRoutesByMenus(router, userStore.menus)

      console.log(router.getRoutes())
      return to.fullPath
    }

    if (userStore.auths[to.meta.auth as AuthKey]) {
      return true
    }

    Message.warning('无访问权限')
    return from.matched.length ? false : '/'
  })

  return router
}
