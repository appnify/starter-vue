import { RouteRecordRaw } from 'vue-router';

export function onRoutesGenerated(routes: RouteRecordRaw[], mode: string) {
  const result = [];
  const isProd = mode !== 'development';

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
  return result;
}
