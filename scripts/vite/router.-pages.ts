import { RouteRecordRaw } from 'vue-router';

const filterHideInRoutes = (routes: RouteRecordRaw[]) => {
  const result: RouteRecordRaw[] = [];
  const isProd = true;

  for (const route of routes) {
    const hideIn = (route.meta?.hideIn ?? []) as string[];
    if (hideIn.includes('*')) {
      continue;
    }
    if (isProd && hideIn.includes('prod')) {
      continue;
    }
    result.push(route);
  }

  return routes;
};

const transformRoutes = (routes: RouteRecordRaw[]) => {

}

export const onRoutesGenerated = (rawRoutes: RouteRecordRaw[]) => {
  const routes = filterHideInRoutes(rawRoutes);
};
