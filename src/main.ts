import App from '@/App.vue';
import { api } from '@/api';
import { dayjs } from '@/plugins/dayjs';
import { NProgress } from '@/plugins/nprogress';
import { router } from '@/router';
import { store } from '@/store';
import { style } from '@/styles';
import { createApp } from 'vue';

const run = async () => {
  const app = createApp(App);
  /**
   * 配置 DayJS 默认语言和插件等
   */
  app.use(dayjs);
  /**
   * 配置 Nprogress 默认行为和样式
   */
  app.use(NProgress);
  /**
   * 状态管理
   */
  app.use(store);
  /**
   * 请求接口
   */
  app.use(api);
  /**
   * 加载样式
   */
  app.use(style);
  /**
   * 使用路由
   */
  app.use(router);
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
