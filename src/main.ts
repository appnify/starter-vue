import { createApp } from 'vue';
import App from '@/App.vue';
import { router } from '@/router';
import { store } from '@/store';
import { style } from '@/styles';
import { dayjs } from '@/libs/dayjs';
import { NProgress } from '@/libs/nprogress';
import { api } from '@/api';

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
