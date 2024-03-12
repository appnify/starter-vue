import { RouteRecordName } from 'vue-router';
import { RouteRecordRaw } from 'vue-router/auto';
import { routes } from 'vue-router/auto-routes';

/**
 * 菜单项
 */
export interface MenuItem {
  /**
   * ID(唯一)
   */
  id: string;
  /**
   * 父级ID
   */
  pid?: string;
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

function mapRoutesToMenus(routes: RouteRecordRaw[], pid?: string) {
  const menus: MenuItem[] = routes.map((route, index) => {
    const path = (route.name as string) ?? route.path;
    const id = (route.name as string) ?? path;
    const { cache, title, icon, sort } = route.meta ?? {};
    return {
      id,
      pid,
      path,
      sort,
      title,
      icon,
      cache,
      children: route.children ? mapRoutesToMenus(route.children, id) : undefined,
    };
  });
  return menus.sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));
}

const appRoutes = routes.find(route => route.name === '/_app');

export const menus = mapRoutesToMenus(appRoutes?.children ?? []);

console.log({ menus });
