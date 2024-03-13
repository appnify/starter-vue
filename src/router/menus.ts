import { RouteRecordRaw } from 'vue-router/auto';
import { APP_ROUTE_NAME, getAppRoutes, routes } from './routes';

/**
 * 菜单项
 */
export interface MenuItem {
  /**
   * 名字(唯一)
   */
  name: string;
  /**
   * 父级ID
   */
  parentName?: string;
  /**
   * 访问路径
   */
  path: string;
  /**
   * 排序(越小越靠前)
   */
  sort?: number;
  /**
   * 标题
   */
  title?: string;
  /**
   * 图标
   */
  icon?: string;
  /**
   * 是否隐藏
   */
  hideIn?: ('*' | 'menu' | 'prod')[];
  /**
   * 缓存的组件名字
   */
  cache?: string;
  /**
   * 子菜单
   */
  children?: MenuItem[];
}

export function menuToRoute(menu: MenuItem) {
  return {
    path: menu.path,
    name: menu.name,
    meta: {
      title: menu.title,
      icon: menu.icon,
      sort: menu.sort,
      hideIn: menu.hideIn,
      cache: menu.cache,
    },
    children: menu.children?.map(menuToRoute),
  };
}

export function mapRoutesToMenus(routes: RouteRecordRaw[], parentName?: string) {
  const menus: MenuItem[] = routes.map((route, index) => {
    const path = (route.name as string) ?? route.path;
    const name = (route.name as string) ?? path;
    const { cache, title, icon, sort } = route.meta ?? {};
    const children = route.children ? mapRoutesToMenus(route.children, name) : undefined;
    return {
      name,
      parentName,
      path,
      sort,
      title,
      icon,
      cache,
      children,
    };
  });
  return menus.sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));
}

const appRoutes = getAppRoutes(routes);

export const menus = mapRoutesToMenus(appRoutes);
