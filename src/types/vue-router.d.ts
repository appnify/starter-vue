import 'vue-router';

declare module 'vue-router' {
  interface RouteRecordRaw {
    parentName?: string;
  }

  interface RouteRecordSingleViewWithChildren {
    parentName?: string;
  }

  interface RouteRecordSingleView {
    parentName?: string;
  }

  interface RouteRecordMultipleViews {
    parentName?: string;
  }

  interface RouteRecordMultipleViewsWithChildren {
    parentName?: string;
  }

  interface RouteRecordRedirect {
    parentName?: string;
  }

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
     * 使用 icon-park-outline 图标集的图标类名
     */
    icon?: string;
    /**
     * 显示顺序
     * @description
     * 在菜单中的显示顺序，越小越靠前
     */
    sort?: number;
    /**
     * 是否在菜单导航中隐藏
     * @description
     * - false  // 不隐藏(默认)
     * - true   // 在路由和菜单中隐藏，即忽略且不打包
     * - 'menu' // 在菜单中隐藏，通过其他方式访问
     * - 'prod' // 在生产环境下隐藏
     */
    hide?: boolean | 'menu' | 'prod';
    /**
     * 所需权限
     * @example
     * ```js
     * ['system:user']
     * ```
     */
    auth?: string[];
    /**
     * 是否缓存
     * @description
     * 是否使用 keep-alive 缓存
     */
    cache?: boolean;
    /**
     * 组件名字
     * @description
     * 组件名字，当 cache为true 时必须
     */
    name?: string;
    /**
     * 是否显示loading
     * @description
     * 可以自定义 loading 文本
     */
    loading?: boolean | string;
    /**
     * 链接
     * @description
     * ```js
     * 'https://juetan.cn'
     * ```
     */
    link?: string;
    parentPath?: string;
  }
}
