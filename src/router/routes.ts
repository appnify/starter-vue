import { RouteRecordRaw } from 'vue-router/auto';
import { routes } from 'vue-router/auto-routes';

const APP_ROUTE_NAME = '/_app';

const getAppRoutes = (routes: RouteRecordRaw[]) => {
  const appRoutes = routes.find(route => route.name === APP_ROUTE_NAME);
  if (!appRoutes) {
    throw new Error('app routes not found');
  }
  return appRoutes.children ?? [];
};

function eachRoutes(routes: RouteRecordRaw[], fn: (route: RouteRecordRaw) => void) {
  for (const route of routes) {
    eachRoutes(route.children ?? [], fn);
    fn(route);
  }
}

eachRoutes(routes, route => {
  if (route.meta?.empty) {
    delete route.component;
  }
  if (!route.name) {
    route.name = route.path;
  }
  if (!(route.name as string).startsWith('/_')) {
    route.path = route.name as string;
  }
});

export { routes, getAppRoutes, APP_ROUTE_NAME };
