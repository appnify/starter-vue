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
  app.use(dayjs);
  app.use(NProgress);
  app.use(store);
  app.use(api);
  app.use(style);
  app.use(router);
  await router.isReady();
  app.mount('#app');
};

run();
