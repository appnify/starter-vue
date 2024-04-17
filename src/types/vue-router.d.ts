import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /**
     * 页面标题，菜单和导航面包屑等地方会用到
     * @example
     * ```ts
     * '用户管理'
     * ```
     */
    title: string
    /**
     * 页面图标，使用 unocss presetIcons 支持的图标集
     * @example
     * ```ts
     * 'i-icon-park-outline-home'
     * ```
     */
    icon?: string
    /**
     * 显示顺序， 在菜单中的显示顺序，越小越靠前
     * @default
     * ```ts
     * 0
     * ```
     */
    sort?: number
    /**
     * 是否隐藏，* 表示隐藏，menu 表示在菜单中隐藏，prod 表示在生产环境下隐藏
     * @default
     * ```ts
     * undefined
     * ```
     */
    hideIn?: ('*' | 'menu' | 'prod')[]
    /**
     * 所需权限，默认为`login`(需登录)，无需权限可指定为`*`，只能未登录访问指定为`logout`。
     * @example
     * ```js
     * 'system_user'
     * ```
     */
    auth?: string
    /**
     * 组件名字，填 defineOptions 或 defineComponent 中的name属性，对于 keepalive 缓存很重要
     * @example
     * ```ts
     * 'UserPage'
     * ```
     */
    componentName?: string
    /**
     * 是否使用 keep-alive 进行缓存，需同时指定 componentName 属性
     * @default
     * ```ts
     * false
     * ```
     */
    cache?: string
    /**
     * 首次加载时是否显示loading，可以自定义 loading 文本
     * @default
     * ```ts
     * true
     * ```
     */
    loading?: boolean | string
    /**
     * 是否将路由的 component 设为空，仅作为菜单层级
     * @default
     * ```ts
     * false
     * ```
     */
    empty?: boolean
  }
}
