import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    /**
     * 页面标题
     * @description
     * 菜单和导航面包屑等地方会用到
     */
    title?: string;
    /**
     * 页面图标
     * @description
     * 使用 i-icon-park-outline 图标集的图标类名
     */
    icon?: string;
    /**
     * 显示顺序
     * @description
     * 在菜单中的显示顺序，越小越靠前
     */
    sort?: number;
    /**
     * 是否隐藏
     * @description
     * - '*'    // 所有地方都隐藏
     * - 'menu' // 在菜单中隐藏，通过路由等方式访问
     * - 'prod' // 在生产环境下隐藏
     */
    hideIn?: ('*' | 'menu' | 'prod')[];
    /**
     * 所需权限
     * @example
     * ```js
     * ['system:user']
     * ```
     */
    auth?: string[];
    /**
     * 组件名字
     * @description 填 defineOptions 或 defineComponent 中的name属性，对于 keepalive 缓存很重要
     */
    componentName: string;
    /**
     * 组件缓存
     * @description
     * 是否使用 keep-alive 缓存，需同时指定 componentName 属性
     */
    cache?: string;
    /**
     * 首次加载时是否显示loading
     * @description
     * 可以自定义 loading 文本
     */
    loading?: boolean | string;
    /**
     * 是否将路由的 component 设为空，仅作为菜单层级
     */
    empty?: boolean;
  }
}
