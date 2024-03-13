import App from '@/App.vue';
import { axios } from '@/plugins/axios';
import { dayjs } from '@/plugins/dayjs';
import { NProgress } from '@/plugins/nprogress';
import { logout } from '@/plugins/logout';
import { router } from '@/router';
import { store } from '@/store';
import { style } from '@/styles';
import { createApp } from 'vue';

const run = async () => {
  const app = createApp(App);
  /**
   * 初始化 DayJS 默认语言和插件等
   */
  app.use(dayjs);
  /**
   * 初始化 Nprogress 默认行为和样式
   */
  app.use(NProgress);
  /**
   * 初始化 axios 配置
   */
  app.use(axios);
  /**
   * 状态管理
   */
  app.use(store);
  /**
   * 加载样式
   */
  app.use(style);
  /**
   * 使用路由
   */
  app.use(router);
  /**
   * 登陆过期的处理
   */
  app.use(logout);
  /**
   * 等待首屏路由加载完毕
   */
  await router.isReady();
  /**
   * 挂载到页面
   */
  app.mount('#app');
};

run();
