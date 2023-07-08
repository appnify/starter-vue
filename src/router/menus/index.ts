import { RouteRecordRaw } from "vue-router";
import { appRoutes } from "../routes";

/**
 * 菜单项类型
 */
interface MenuItem {
  id: string;
  parentId?: string;
  path: string;
  sort?: number;
  title?: string;
  icon?: string;
  external?: boolean;
  children?: MenuItem[];
}

/**
 * 转换页面路由为菜单项
 * @param routes 路由配置
 * @returns
 */
function routesToItems(routes: RouteRecordRaw[]): MenuItem[] {
  const items: MenuItem[] = [];

  routes.forEach((route) => {
    let paths = route.path.split("/");
    let id = route.path;
    let parentId = paths.slice(0, -1).join("/");

    if ((route as any).parentMeta) {
      id = `${route.path}/index`;
      parentId = route.path;
      items.push({
        id: route.path,
        parentId: paths.slice(0, -1).join("/"),
        path: `${route.path}`,
        title: (route as any).parentMeta.title,
        icon: (route as any).parentMeta.icon,
        sort: (route as any).parentMeta.sort,
      });
    } else {
      const p = paths.slice(0, -1).join("/");
      if (routes.some((i) => i.path === p && (i as any).parentMeta)) {
        parentId = p;
      }
    }

    items.push({
      id,
      parentId,
      path: route.path,
      sort: route.meta?.sort,
      title: route.meta?.title,
      icon: route.meta?.icon,
    });
  });

  return items;
}

/**
 * 转换菜单项为树形结构
 * @param list 菜单项列表
 * @returns
 */
function listToTree(list: MenuItem[]) {
  const map: Record<string, MenuItem> = {};
  const tree: MenuItem[] = [];

  list.forEach((item) => {
    map[item.id] = item;
  });

  list.forEach((item) => {
    const parent = map[item.parentId as string];
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      tree.push(item);
    }
  });

  return tree;
}

/**
 * 排序菜单项
 * @param routes 菜单项列表
 * @param key 排序字段
 * @returns
 */
function sort<T extends { children?: T[]; [key: string]: any }>(
  routes: T[],
  key = "sort"
) {
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
 * 转换路由为树形菜单项，并排序
 * @param routes 路由配置
 * @returns
 */
function transformToMenuItems(routes: RouteRecordRaw[]) {
  const items = sort(listToTree(routesToItems(routes)));
  return items;
}

/**
 * 由应用路由生成的菜单项
 */
const menus = transformToMenuItems(appRoutes);

export { menus };
export type { MenuItem };
