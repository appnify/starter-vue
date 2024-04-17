import { RouteRecordRaw } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

export const APP_ROUTE_NAME = '/_app'

function eachRoutes(routes: RouteRecordRaw[], fn: (route: RouteRecordRaw) => void) {
  for (const route of routes) {
    eachRoutes(route.children ?? [], fn)
    fn(route)
  }
}

const treeToMap = (tree: RouteRecordRaw[], map: Map<string, RouteRecordRaw> = new Map()) => {
  for (const item of tree) {
    map.set(item.name as string, item)
    if (item.children) {
      treeToMap(item.children, map)
    }
  }
  return map
}

eachRoutes(routes, route => {
  if (route.meta?.empty) {
    delete route.component
  }
  if (!route.name) {
    route.name = route.path
  }
  if (!(route.name as string).startsWith('/_')) {
    route.path = route.name as string
  }
})

export const routesMap = treeToMap(routes)

export { routes }
