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
  keepAlive: boolean;
  children?: MenuItem[];
}

/**
 * 转换页面路由为菜单项
 * @param routes 路由配置
 */
function routesToItems(routes: RouteRecordRaw[]): MenuItem[] {
  const items: MenuItem[] = [];

  for (const route of routes) {
    const { meta = {}, parentMeta, only, path } = route as any;
    const { title, sort, icon,  keepAlive = false, name } = meta;
    let id = path;
    let paths = route.path.split('/');
    let parentId = paths.slice(0, -1).join('/');
    if (parentMeta) {
      const { title, icon, sort, only } = parentMeta;
      id = `${path}/index`;
      parentId = path;
      items.push({
        title,  
        icon,
        sort,
        path,
        only,
        id: path,
        keepAlive: false,
        parentId: paths.slice(0, -1).join('/'),
      });
    } else {
      const p = paths.slice(0, -1).join('/');
      if (routes.some(i => i.path === p) && parentMeta) {
        parentId = p;
      }
    }
    items.push({ id, title, parentId, path, icon, sort, only, keepAlive, name });
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
export const menus = sort(treeMenus);
