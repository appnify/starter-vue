import { RouteRecordRaw } from "vue-router";

export const APP_HOME_NAME = "__APP_HOME__";

/**
 * 基本路由
 */
export const baseRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: APP_HOME_NAME,
    component: () => "Home Page",
  },
];
