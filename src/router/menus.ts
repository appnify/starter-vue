import { RouteRecordRaw } from 'vue-router/auto'

/**
 * 菜单项
 */
export interface MenuItem {
  /**
   * 路由名字
   */
  routeName: string
  /**
   * 路由别名
   */
  routeAlias?: string
  /**
   * 父级路由名字
   */
  routeParentName?: string
  /**
   * 访问路径
   */
  path: string
  /**
   * 排序(越小越靠前)
   */
  sort: number
  /**
   * 标题
   */
  title: string
  /**
   * 图标
   */
  icon: string
  /**
   * 是否隐藏
   */
  hideIn?: ('*' | 'menu' | 'prod')[]
  /**
   * 缓存的组件名字
   */
  cache?: string
  /**
   * 权限
   */
  auth?: string
  /**
   * 子菜单
   */
  children?: MenuItem[]
}

export function menuToRoute(menu: MenuItem) {
  return {
    path: menu.path,
    name: menu.routeName,
    meta: {
      title: menu.title,
      icon: menu.icon,
      sort: menu.sort,
      hideIn: menu.hideIn,
      cache: menu.cache,
      auth: menu.auth,
    },
    children: menu.children?.map(menuToRoute),
  }
}

export function mapRoutesToMenus(routes: RouteRecordRaw[], routeParentName?: string) {
  const menus: MenuItem[] = routes.map((route, index) => {
    const path = (route.name as string) ?? route.path
    const routeName = (route.name as string) ?? path
    const { cache, title = '暂无标题', icon = 'i-icon-park-outline-home', sort = index, auth } = route.meta ?? {}
    const children = route.children ? mapRoutesToMenus(route.children, routeName) : undefined
    return {
      routeName,
      routeParentName,
      path,
      sort,
      title,
      icon,
      cache,
      auth,
      children,
    }
  })
  return menus.sort((a, b) => a.sort - b.sort)
}

export function mapMenutsToRoutes(menus: MenuItem[], routesMap: Map<string, RouteRecordRaw>) {
  const routes = menus.map(menu => {
    if (menu.path.startsWith('http')) {
      return null
    }
    const route = routesMap.get(menu.routeName)
    if (!route) {
      return null
    }
    const { routeName: name, routeAlias: alias, routeParentName, path, ...meta } = menu
    const children = menu.children ? mapMenutsToRoutes(menu.children, routesMap) : undefined
    return {
      ...route,
      name,
      alias,
      path,
      meta,
      children,
    }
  })
  return routes.filter(Boolean)
}
