import generatedRoutes from 'virtual:generated-pages';
import { RouteRecordRaw } from 'vue-router';

export const TOP_ROUTE_PREF = '_';
export const APP_ROUTE_NAME = '_layout';

function treeRoutes(list: RouteRecordRaw[]) {
  const map: Record<string, RouteRecordRaw> = {};
  const tree: RouteRecordRaw[] = [];

  for (const item of list) {
    map[item.path] = item;
  }

  for (const item of list) {
    const parentPath = item.path.split('/').slice(0, -1).join('/');
    const parent = map[parentPath];
    item.parentName = (parent?.name as string) || APP_ROUTE_NAME;
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      tree.push(item);
    }
  }

  return tree;
}

function sortRoutes(routes: RouteRecordRaw[]) {
  return routes.sort((prev, next) => {
    if (prev.children) {
      prev.children = sortRoutes(prev.children);
    }
    if (next.children) {
      next.children = sortRoutes(next.children);
    }
    const x = prev.meta?.sort ?? 0;
    const y = next.meta?.sort ?? 0;
    return x - y;
  });
}

/**
 * 转换路由
 * @description 以 _ 开头的路由为顶级路由，其余为应用路由
 */
const transformRoutes = (routes: RouteRecordRaw[]) => {
  const topRoutes: RouteRecordRaw[] = [];
  const appRoutes: RouteRecordRaw[] = [];
  let app: RouteRecordRaw;

  for (const route of routes) {
    if (route.name === APP_ROUTE_NAME) {
      route.children = appRoutes;
      app = route;
    }
    if ((route.name as string)?.startsWith(TOP_ROUTE_PREF)) {
      route.path = route.path.replace(TOP_ROUTE_PREF, '');
      topRoutes.push(route);
      continue;
    }
    appRoutes.push(route);
  }

  app!.children = sortRoutes(treeRoutes(appRoutes));
  return [topRoutes, app!.children];
};

export const [routes, appRoutes] = transformRoutes(generatedRoutes);
