import 'vue-router';

declare module 'vue-router' {
  interface RouteRecordRaw {
    parentMeta: {
      /**
       * 页面标题
       */
      title?: string;
      /**
       * 页面图标
       */
      icon?: string;
      /**
       * 页面排序，越小越靠前
       */
      sort?: number;
    };
  }

  interface RouteMeta {
    /**
     * 页面标题
     */
    title?: string;
    /**
     * 页面图标
     */
    icon?: string;
    /**
     * 页面排序，越小越靠前
     */
    sort?: number;
    /**
     * 是否在菜单导航中隐藏
     */
    hidden?: boolean;
    /**
     * 是否在菜单导航中隐藏子菜单
     */
    affix?: boolean;
    /**
     * 是否在面包屑中隐藏
     */
    breadcrumb?: boolean;
    /**
     * 是否缓存页面
     */
    keepAlive?: boolean;
    /**
     * 是否显示loading
     */
    loading?: boolean | string;
  }
}
