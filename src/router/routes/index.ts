import generatedRoutes from "virtual:generated-pages";
import { RouteRecordRaw } from "vue-router";

const APP_ROUTE_NAME = "_layout";

/**
 * 转换一维路由为二维路由
 * @description 以 _ 开头的路由为顶级路由，其余为应用路由
 */
const transformRoutes = (routes: RouteRecordRaw[]) => {
  const topRoutes: RouteRecordRaw[] = [];
  const appRoutes: RouteRecordRaw[] = [];

  for (const route of routes) {
    if ((route.name as string)?.startsWith("_")) {
      route.path = route.path.replace("_", "");
      topRoutes.push(route);
      continue;
    }
    appRoutes.push(route);
  }

  const appRoute = routes.find((i) => i.name === APP_ROUTE_NAME);
  if (appRoute) {
    appRoute.children = appRoutes;
  }

  return [topRoutes, appRoutes];
};

export const [routes, appRoutes] = transformRoutes(generatedRoutes);
