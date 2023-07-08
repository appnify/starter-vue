import generatedRoutes from "virtual:generated-pages";
import { RouteRecordRaw } from "vue-router";

const APP_ROUTE_NAME = "_app";

/**
 * 转换一维路由为二维路由，其中以 _ 开头的路由为顶级路由，其余为应用路由
 * @param routes 路由配置
 * @returns
 */
const transformRoutes = (routes: RouteRecordRaw[]) => {
  const topRoutes: RouteRecordRaw[] = [];
  const appRoutes: RouteRecordRaw[] = [];

  routes.forEach((route) => {
    if ((route.name as string)?.startsWith("_")) {
      route.path = route.path.replace("_", "");
      topRoutes.push(route);
      return;
    }
    // route.component = defineAsyncComponent({
    //   loader: route.component as any,
    //   loadingComponent: () => h("div", null, "loading"),
    //   errorComponent: () => h("div", null, "error"),
    //   delay: 200,
    //   timeout: 3000,
    // });
    appRoutes.push(route);
  });

  const appRoute = routes.find((i) => i.name === APP_ROUTE_NAME);
  if (appRoute) {
    appRoute.children = appRoutes;
  }

  return topRoutes;
};

/**
 * 获取应用路由
 * @param routes 路由配置
 * @returns
 */
const getAppRoutes = (routes: RouteRecordRaw[]) => {
  return routes.find((i) => i.name === APP_ROUTE_NAME)?.children || [];
};

/**
 * 所有路由
 */
const routes = transformRoutes(generatedRoutes);

/**
 * 应用路由
 */
const appRoutes = getAppRoutes(routes);

export { routes, appRoutes };
