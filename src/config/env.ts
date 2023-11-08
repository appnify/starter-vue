/**
 * 环境变量
 */
export const env = {
  /**
   * 站点标题
   */
  title: import.meta.env.VITE_TITLE,
  /**
   * 站点副标题
   */
  subtitle: import.meta.env.VITE_SUBTITLE,
  /**
   * 接口前缀
   */
  apiPrefix: import.meta.env.VITE_API,
  /**
   * 路由模式
   */
  historyMode: import.meta.env.VITE_HISTORY,
  /**
   * 首页路径
   */
  homePath: import.meta.env.VITE_HOME_PATH,
};
