import { RouteRecordRaw } from 'vue-router';
import { appRoutes } from '../routes/page';

/**
 * 菜单项类型
 */
export interface MenuItem {
  id: string;
  parentId?: string;
  path: string;
  sort?: number;
  title?: string;
  icon?: string;
  external?: boolean;
  name?: string;
  only?: undefined | 'none' | 'dev';
  cache?: boolean;
  hide?: any;
  link?: string;
  children?: MenuItem[];
}

/**
 * 转换页面路由为菜单项
 * @param routes 路由配置
 */
function routesToItems(routes: RouteRecordRaw[]): MenuItem[] {
  const items: MenuItem[] = [];

  for (const route of routes) {
    const { path, meta = {} } = route;
    if (meta.hide === true || meta.hide === 'menu') {
      continue;
    }
    let parentId = route.path.split('/').slice(0, -1).join('/');
    if (!routes.some(i => i.path === parentId)) {
      parentId = '';
    }
    items.push({ ...meta, id: path, parentId, path });
  }

  return items;
}

/**
 * 转换菜单项为树形结构
 * @param list 菜单项列表
 */
function listToTree(list: MenuItem[]) {
  const map: Record<string, MenuItem> = {};
  const tree: MenuItem[] = [];

  for (const item of list) {
    map[item.id] = item;
  }

  for (const item of list) {
    const parent = map[item.parentId as string];
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      tree.push(item);
    }
  }

  return tree;
}

/**
 * 排序菜单项
 * @param routes 菜单项列表
 * @param key 排序字段
 */
function sort<T extends { children?: T[]; [key: string]: any }>(routes: T[], key = 'sort') {
  return routes.sort((a, b) => {
    if (Array.isArray(a.children)) {
      a.children = sort(a.children);
    }
    if (Array.isArray(b.children)) {
      b.children = sort(b.children);
    }
    return (a[key] as number) - (b[key] as number);
  });
}

function routeToMenus(routes: RouteRecordRaw[]) {
  const items: MenuItem[] = [];

  for (const route of routes) {
    const { path, meta = {} } = route;
    const item = { ...meta };
    if (route.children) {
      item.children = routeToMenus(route.children);
    }
    items.push({ ...item, id: path, parentId: (route as any).parentPath, path });
  }

  return items;
}

/**
 * 扁平化的菜单
 */
export const flatMenus = routesToItems(appRoutes);

/**
 * 树结构菜单
 */
export const treeMenus = listToTree(flatMenus);

/**
 * 排序过的树级菜单
 */
export const menus = routeToMenus(appRoutes);
