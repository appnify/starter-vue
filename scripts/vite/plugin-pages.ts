import { RouteRecordRaw } from 'vue-router';

export function onRoutesGenerated(routes: RouteRecordRaw[], mode: string) {
  const isProd = mode !== 'development';
  const result = [];
  for (const route of routes) {
    const { hide } = route.meta ?? {};
    if (!route.meta) {
      continue;
    }
    if (hide === true) {
      continue;
    }
    if (isProd && hide === 'prod') {
      continue;
    }
    result.push(route);
  }
  return result;
}
