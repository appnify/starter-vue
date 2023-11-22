import generatedRoutes from 'virtual:generated-pages';
import { RouteRecordRaw } from 'vue-router';

export const TOP_ROUTE_PREF = '_';
export const APP_ROUTE_NAME = '_layout';

/**
 * 转换路由
 * @description 以 _ 开头的路由为顶级路由，其余为应用路由
 */
const transformRoutes = (routes: RouteRecordRaw[]) => {
  const topRoutes: RouteRecordRaw[] = [];
  const appRoutes: RouteRecordRaw[] = [];

  for (const route of routes) {
    if ((route.name as string)?.startsWith(TOP_ROUTE_PREF)) {
      if (route.name === APP_ROUTE_NAME) {
        route.children = appRoutes;
      }
      route.path = route.path.replace(TOP_ROUTE_PREF, '');
      topRoutes.push(route);
      continue;
    }
    appRoutes.push(route);
  }

  return [topRoutes, appRoutes];
};

export const [routes, appRoutes] = transformRoutes(generatedRoutes);
