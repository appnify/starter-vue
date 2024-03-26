import '@/styles';
import App from '@/App.vue';
import { router } from '@/router';
import { store } from '@/store';
import { createApp } from 'vue';

const run = async () => {
  const app = createApp(App);
  /**
   * 状态管理
   */
  app.use(store);
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
