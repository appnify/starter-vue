/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

/// <reference types="unplugin-vue-router/client" />

import type {
  // type safe route locations
  RouteLocationTypedList,
  RouteLocationResolvedTypedList,
  RouteLocationNormalizedTypedList,
  RouteLocationNormalizedLoadedTypedList,
  RouteLocationAsString,
  RouteLocationAsRelativeTypedList,
  RouteLocationAsPathTypedList,

  // helper types
  // route definitions
  RouteRecordInfo,
  ParamValue,
  ParamValueOneOrMore,
  ParamValueZeroOrMore,
  ParamValueZeroOrOne,

  // vue-router extensions
  _RouterTyped,
  RouterLinkTyped,
  RouterLinkPropsTyped,
  NavigationGuard,
  UseLinkFnTyped,

  // data fetching
  _DataLoader,
  _DefineLoaderOptions,
} from 'unplugin-vue-router/types'

declare module 'vue-router/auto/routes' {
  export interface RouteNamedMap {
    '/_layout/': RouteRecordInfo<'/_layout/', '/_layout', Record<never, never>, Record<never, never>>,
    '/_login/': RouteRecordInfo<'/_login/', '/_login', Record<never, never>, Record<never, never>>,
    '/[..._all]/': RouteRecordInfo<'/[..._all]/', '/:_all(.*)', { _all: ParamValue<true> }, { _all: ParamValue<false> }>,
    '/content/': RouteRecordInfo<'/content/', '/content', Record<never, never>, Record<never, never>>,
    '/content/category/': RouteRecordInfo<'/content/category/', '/content/category', Record<never, never>, Record<never, never>>,
    '/content/comment/': RouteRecordInfo<'/content/comment/', '/content/comment', Record<never, never>, Record<never, never>>,
    '/content/material/': RouteRecordInfo<'/content/material/', '/content/material', Record<never, never>, Record<never, never>>,
    '/content/post/': RouteRecordInfo<'/content/post/', '/content/post', Record<never, never>, Record<never, never>>,
    '/dev/': RouteRecordInfo<'/dev/', '/dev', Record<never, never>, Record<never, never>>,
    '/dev/editor/': RouteRecordInfo<'/dev/editor/', '/dev/editor', Record<never, never>, Record<never, never>>,
    '/dev/openapi/': RouteRecordInfo<'/dev/openapi/', '/dev/openapi', Record<never, never>, Record<never, never>>,
    '/home/': RouteRecordInfo<'/home/', '/home', Record<never, never>, Record<never, never>>,
    '/log/': RouteRecordInfo<'/log/', '/log', Record<never, never>, Record<never, never>>,
    '/log/login/': RouteRecordInfo<'/log/login/', '/log/login', Record<never, never>, Record<never, never>>,
    '/log/operation/': RouteRecordInfo<'/log/operation/', '/log/operation', Record<never, never>, Record<never, never>>,
    '/system/': RouteRecordInfo<'/system/', '/system', Record<never, never>, Record<never, never>>,
    '/system/dict/': RouteRecordInfo<'/system/dict/', '/system/dict', Record<never, never>, Record<never, never>>,
    '/system/menu/': RouteRecordInfo<'/system/menu/', '/system/menu', Record<never, never>, Record<never, never>>,
    '/system/role/': RouteRecordInfo<'/system/role/', '/system/role', Record<never, never>, Record<never, never>>,
    '/system/user/': RouteRecordInfo<'/system/user/', '/system/user', Record<never, never>, Record<never, never>>,
    '/user/': RouteRecordInfo<'/user/', '/user', Record<never, never>, Record<never, never>>,
    '/user/TabCommon': RouteRecordInfo<'/user/TabCommon', '/user/TabCommon', Record<never, never>, Record<never, never>>,
    '/user/TabDemo': RouteRecordInfo<'/user/TabDemo', '/user/TabDemo', Record<never, never>, Record<never, never>>,
    '/user/TabMail': RouteRecordInfo<'/user/TabMail', '/user/TabMail', Record<never, never>, Record<never, never>>,
  }
}

declare module 'vue-router/auto' {
  import type { RouteNamedMap } from 'vue-router/auto/routes'

  export type RouterTyped = _RouterTyped<RouteNamedMap>

  /**
   * Type safe version of `RouteLocationNormalized` (the type of `to` and `from` in navigation guards).
   * Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationNormalized<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationNormalizedTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocationNormalizedLoaded` (the return type of `useRoute()`).
   * Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationNormalizedLoaded<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationNormalizedLoadedTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocationResolved` (the returned route of `router.resolve()`).
   * Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationResolved<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationResolvedTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocation` . Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocation<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocationRaw` . Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationRaw<Name extends keyof RouteNamedMap = keyof RouteNamedMap> =
    | RouteLocationAsString<RouteNamedMap>
    | RouteLocationAsRelativeTypedList<RouteNamedMap>[Name]
    | RouteLocationAsPathTypedList<RouteNamedMap>[Name]

  /**
   * Generate a type safe params for a route location. Requires the name of the route to be passed as a generic.
   */
  export type RouteParams<Name extends keyof RouteNamedMap> = RouteNamedMap[Name]['params']
  /**
   * Generate a type safe raw params for a route location. Requires the name of the route to be passed as a generic.
   */
  export type RouteParamsRaw<Name extends keyof RouteNamedMap> = RouteNamedMap[Name]['paramsRaw']

  export function useRouter(): RouterTyped
  export function useRoute<Name extends keyof RouteNamedMap = keyof RouteNamedMap>(name?: Name): RouteLocationNormalizedLoadedTypedList<RouteNamedMap>[Name]

  export const useLink: UseLinkFnTyped<RouteNamedMap>

  export function onBeforeRouteLeave(guard: NavigationGuard<RouteNamedMap>): void
  export function onBeforeRouteUpdate(guard: NavigationGuard<RouteNamedMap>): void

  export const RouterLink: RouterLinkTyped<RouteNamedMap>
  export const RouterLinkProps: RouterLinkPropsTyped<RouteNamedMap>

  // Experimental Data Fetching

  export function defineLoader<
    P extends Promise<any>,
    Name extends keyof RouteNamedMap = keyof RouteNamedMap,
    isLazy extends boolean = false,
  >(
    name: Name,
    loader: (route: RouteLocationNormalizedLoaded<Name>) => P,
    options?: _DefineLoaderOptions<isLazy>,
  ): _DataLoader<Awaited<P>, isLazy>
  export function defineLoader<
    P extends Promise<any>,
    isLazy extends boolean = false,
  >(
    loader: (route: RouteLocationNormalizedLoaded) => P,
    options?: _DefineLoaderOptions<isLazy>,
  ): _DataLoader<Awaited<P>, isLazy>

  export {
    _definePage as definePage,
    _HasDataLoaderMeta as HasDataLoaderMeta,
    _setupDataFetchingGuard as setupDataFetchingGuard,
    _stopDataFetchingScope as stopDataFetchingScope,
  } from 'unplugin-vue-router/runtime'
}

declare module 'vue-router' {
  import type { RouteNamedMap } from 'vue-router/auto/routes'

  export interface TypesConfig {
    beforeRouteUpdate: NavigationGuard<RouteNamedMap>
    beforeRouteLeave: NavigationGuard<RouteNamedMap>

    $route: RouteLocationNormalizedLoadedTypedList<RouteNamedMap>[keyof RouteNamedMap]
    $router: _RouterTyped<RouteNamedMap>

    RouterLink: RouterLinkTyped<RouteNamedMap>
  }
}
