import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import { store } from "./store";
import { style } from "./style";

const run = async () => {
  const app = createApp(App);
  app.use(store);
  app.use(style);
  app.use(router);
  await router.isReady();
  app.mount("#app");
};

run();
